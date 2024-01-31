// @flow

import { Login } from '@commapp/opaque-ke-wasm';

import identityServiceConfig from 'lib/facts/identity-service.js';
import {
  type IdentityServiceAuthLayer,
  type IdentityServiceClient,
  type DeviceOlmOutboundKeys,
  deviceOlmOutboundKeysValidator,
  type UserDevicesOlmOutboundKeys,
  type IdentityAuthResult,
  type IdentityDeviceKeyUpload,
  identityDeviceTypes,
  identityAuthResultValidator,
} from 'lib/types/identity-service-types.js';
import { getMessageForException } from 'lib/utils/errors.js';
import { assertWithValidator } from 'lib/utils/validation-utils.js';

import { VersionInterceptor, AuthInterceptor } from './interceptor.js';
import { initOpaque } from '../crypto/opaque-utils.js';
import * as IdentityAuthClient from '../protobufs/identity-auth-client.cjs';
import * as IdentityAuthStructs from '../protobufs/identity-auth-structs.cjs';
import {
  DeviceKeyUpload,
  Empty,
  IdentityKeyInfo,
  OpaqueLoginFinishRequest,
  OpaqueLoginStartRequest,
  Prekey,
} from '../protobufs/identity-unauth-structs.cjs';
import * as IdentityUnauthClient from '../protobufs/identity-unauth.cjs';

class IdentityServiceClientWrapper implements IdentityServiceClient {
  authClient: ?IdentityAuthClient.IdentityClientServicePromiseClient;
  unauthClient: IdentityUnauthClient.IdentityClientServicePromiseClient;
  getDeviceKeyUpload: () => Promise<IdentityDeviceKeyUpload>;

  constructor(
    authLayer: ?IdentityServiceAuthLayer,
    getDeviceKeyUpload: () => Promise<IdentityDeviceKeyUpload>,
  ) {
    if (authLayer) {
      this.authClient =
        IdentityServiceClientWrapper.createAuthClient(authLayer);
    }
    this.unauthClient = IdentityServiceClientWrapper.createUnauthClient();
    this.getDeviceKeyUpload = getDeviceKeyUpload;
  }

  static determineSocketAddr(): string {
    return process.env.IDENTITY_SOCKET_ADDR ?? identityServiceConfig.defaultURL;
  }

  static createAuthClient(
    authLayer: IdentityServiceAuthLayer,
  ): IdentityAuthClient.IdentityClientServicePromiseClient {
    const { userID, deviceID, commServicesAccessToken } = authLayer;

    const identitySocketAddr =
      IdentityServiceClientWrapper.determineSocketAddr();

    const versionInterceptor = new VersionInterceptor<Request, Response>();
    const authInterceptor = new AuthInterceptor<Request, Response>(
      userID,
      deviceID,
      commServicesAccessToken,
    );

    const authClientOpts = {
      unaryInterceptors: [versionInterceptor, authInterceptor],
    };

    return new IdentityAuthClient.IdentityClientServicePromiseClient(
      identitySocketAddr,
      null,
      authClientOpts,
    );
  }

  static createUnauthClient(): IdentityUnauthClient.IdentityClientServicePromiseClient {
    const identitySocketAddr =
      IdentityServiceClientWrapper.determineSocketAddr();

    const versionInterceptor = new VersionInterceptor<Request, Response>();

    const unauthClientOpts = {
      unaryInterceptors: [versionInterceptor],
    };

    return new IdentityUnauthClient.IdentityClientServicePromiseClient(
      identitySocketAddr,
      null,
      unauthClientOpts,
    );
  }

  deleteUser: () => Promise<void> = async () => {
    if (!this.authClient) {
      throw new Error('Identity service client is not initialized');
    }
    await this.authClient.deleteUser(new Empty());
  };

  getKeyserverKeys: (keyserverID: string) => Promise<DeviceOlmOutboundKeys> =
    async (keyserverID: string) => {
      const client = this.authClient;
      if (!client) {
        throw new Error('Identity service client is not initialized');
      }

      const request = new IdentityAuthStructs.OutboundKeysForUserRequest();
      request.setUserId(keyserverID);
      const response = await client.getKeyserverKeys(request);

      const keyserverInfo = response.getKeyserverInfo();
      const identityInfo = keyserverInfo?.getIdentityInfo();
      const contentPreKey = keyserverInfo?.getContentPrekey();
      const notifPreKey = keyserverInfo?.getNotifPrekey();
      const payload = identityInfo?.getPayload();

      const keyserverKeys = {
        identityKeysBlob: payload ? JSON.parse(payload) : null,
        contentInitializationInfo: {
          prekey: contentPreKey?.getPrekey(),
          prekeySignature: contentPreKey?.getPrekeySignature(),
          oneTimeKey: keyserverInfo?.getOneTimeContentPrekey(),
        },
        notifInitializationInfo: {
          prekey: notifPreKey?.getPrekey(),
          prekeySignature: notifPreKey?.getPrekeySignature(),
          oneTimeKey: keyserverInfo?.getOneTimeNotifPrekey(),
        },
        payloadSignature: identityInfo?.getPayloadSignature(),
        socialProof: identityInfo?.getSocialProof(),
      };

      if (!keyserverKeys.contentInitializationInfo.oneTimeKey) {
        throw new Error('Missing content one time key');
      }
      if (!keyserverKeys.notifInitializationInfo.oneTimeKey) {
        throw new Error('Missing notif one time key');
      }

      return assertWithValidator(keyserverKeys, deviceOlmOutboundKeysValidator);
    };

  getOutboundKeysForUser: (
    userID: string,
  ) => Promise<UserDevicesOlmOutboundKeys[]> = async (userID: string) => {
    const client = this.authClient;
    if (!client) {
      throw new Error('Identity service client is not initialized');
    }

    const request = new IdentityAuthStructs.OutboundKeysForUserRequest();
    request.setUserId(userID);
    const response = await client.getOutboundKeysForUser(request);
    const devicesMap = response.toObject()?.devicesMap;

    if (!devicesMap || !Array.isArray(devicesMap)) {
      throw new Error('Invalid devicesMap');
    }

    const devicesKeys: (?UserDevicesOlmOutboundKeys)[] = devicesMap.map(
      ([deviceID, outboundKeysInfo]) => {
        const identityInfo = outboundKeysInfo?.identityInfo;
        const payload = identityInfo?.payload;
        const contentPreKey = outboundKeysInfo?.contentPrekey;
        const notifPreKey = outboundKeysInfo?.notifPrekey;

        if (!(typeof deviceID === 'string')) {
          console.log(`Invalid deviceID in devicesMap: ${deviceID}`);
          return null;
        }

        if (
          !outboundKeysInfo.oneTimeContentPrekey ||
          !outboundKeysInfo.oneTimeNotifPrekey
        ) {
          console.log(`Missing one time key for device ${deviceID}`);
          return {
            deviceID,
            keys: null,
          };
        }

        const deviceKeys = {
          identityKeysBlob: payload ? JSON.parse(payload) : null,
          contentInitializationInfo: {
            prekey: contentPreKey?.prekey,
            prekeySignature: contentPreKey?.prekeySignature,
            oneTimeKey: outboundKeysInfo.oneTimeContentPrekey,
          },
          notifInitializationInfo: {
            prekey: notifPreKey?.prekey,
            prekeySignature: notifPreKey?.prekeySignature,
            oneTimeKey: outboundKeysInfo.oneTimeNotifPrekey,
          },
          payloadSignature: identityInfo?.payloadSignature,
          socialProof: identityInfo?.socialProof,
        };

        try {
          const validatedKeys = assertWithValidator(
            deviceKeys,
            deviceOlmOutboundKeysValidator,
          );
          return {
            deviceID,
            keys: validatedKeys,
          };
        } catch (e) {
          console.log(e);
          return {
            deviceID,
            keys: null,
          };
        }
      },
    );

    return devicesKeys.filter(Boolean);
  };

  logInPasswordUser: (
    username: string,
    password: string,
  ) => Promise<IdentityAuthResult> = async (
    username: string,
    password: string,
  ) => {
    const client = this.unauthClient;
    if (!client) {
      throw new Error('Identity service client is not initialized');
    }

    const [identityDeviceKeyUpload] = await Promise.all([
      this.getDeviceKeyUpload(),
      initOpaque(),
    ]);

    const {
      keyPayload,
      keyPayloadSignature,
      contentPrekey,
      contentPrekeySignature,
      notifPrekey,
      notifPrekeySignature,
      contentOneTimeKeys,
      notifOneTimeKeys,
    } = identityDeviceKeyUpload;

    const contentOneTimeKeysArray = [...contentOneTimeKeys];
    const notifOneTimeKeysArray = [...notifOneTimeKeys];

    const opaqueLogin = new Login();
    const startRequestBytes = opaqueLogin.start(password);

    const identityKeyInfo = new IdentityKeyInfo();
    identityKeyInfo.setPayload(keyPayload);
    identityKeyInfo.setPayloadSignature(keyPayloadSignature);

    const contentPrekeyUpload = new Prekey();
    contentPrekeyUpload.setPrekey(contentPrekey);
    contentPrekeyUpload.setPrekeySignature(contentPrekeySignature);

    const notifPrekeyUpload = new Prekey();
    notifPrekeyUpload.setPrekey(notifPrekey);
    notifPrekeyUpload.setPrekeySignature(notifPrekeySignature);

    const deviceKeyUpload = new DeviceKeyUpload();
    deviceKeyUpload.setDeviceKeyInfo(identityKeyInfo);
    deviceKeyUpload.setContentUpload(contentPrekeyUpload);
    deviceKeyUpload.setNotifUpload(notifPrekeyUpload);
    deviceKeyUpload.setOneTimeContentPrekeysList(contentOneTimeKeysArray);
    deviceKeyUpload.setOneTimeNotifPrekeysList(notifOneTimeKeysArray);
    deviceKeyUpload.setDeviceType(identityDeviceTypes.WEB);

    const loginStartRequest = new OpaqueLoginStartRequest();
    loginStartRequest.setUsername(username);
    loginStartRequest.setOpaqueLoginRequest(startRequestBytes);
    loginStartRequest.setDeviceKeyUpload(deviceKeyUpload);

    let loginStartResponse;
    try {
      loginStartResponse =
        await client.logInPasswordUserStart(loginStartRequest);
    } catch (e) {
      console.log('Error calling logInPasswordUserStart:', e);
      throw new Error(getMessageForException(e) ?? 'unknown');
    }
    const finishRequestBytes = opaqueLogin.finish(
      loginStartResponse.getOpaqueLoginResponse_asU8(),
    );

    const loginFinishRequest = new OpaqueLoginFinishRequest();
    loginFinishRequest.setSessionId(loginStartResponse.getSessionId());
    loginFinishRequest.setOpaqueLoginUpload(finishRequestBytes);

    let loginFinishResponse;
    try {
      loginFinishResponse =
        await client.logInPasswordUserFinish(loginFinishRequest);
    } catch (e) {
      console.log('Error calling logInPasswordUserFinish:', e);
      throw new Error(getMessageForException(e) ?? 'unknown');
    }

    const userID = loginFinishResponse.getUserId();
    const accessToken = loginFinishResponse.getAccessToken();
    const identityAuthResult = { accessToken, userID, username };

    return assertWithValidator(identityAuthResult, identityAuthResultValidator);
  };

  generateNonce: () => Promise<string> = async () => {
    const result = await this.unauthClient.generateNonce(new Empty());
    return result.getNonce();
  };
}

export { IdentityServiceClientWrapper };
