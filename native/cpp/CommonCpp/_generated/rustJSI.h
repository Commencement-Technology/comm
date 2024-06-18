/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook {
namespace react {

class JSI_EXPORT CommRustModuleSchemaCxxSpecJSI : public TurboModule {
protected:
  CommRustModuleSchemaCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  virtual jsi::Value generateNonce(jsi::Runtime &rt) = 0;
  virtual jsi::Value registerPasswordUser(jsi::Runtime &rt, jsi::String username, jsi::String password, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String farcasterID, jsi::String initialDeviceList) = 0;
  virtual jsi::Value registerReservedPasswordUser(jsi::Runtime &rt, jsi::String username, jsi::String password, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String keyserverMessage, jsi::String keyserverSignature, jsi::String initialDeviceList) = 0;
  virtual jsi::Value logInPasswordUser(jsi::Runtime &rt, jsi::String username, jsi::String password, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature) = 0;
  virtual jsi::Value registerWalletUser(jsi::Runtime &rt, jsi::String siweMessage, jsi::String siweSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String farcasterID, jsi::String initialDeviceList) = 0;
  virtual jsi::Value registerReservedWalletUser(jsi::Runtime &rt, jsi::String siweMessage, jsi::String siweSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String keyserverMessage, jsi::String keyserverSignature, jsi::String initialDeviceList) = 0;
  virtual jsi::Value logInWalletUser(jsi::Runtime &rt, jsi::String siweMessage, jsi::String siweSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature) = 0;
  virtual jsi::Value updatePassword(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken, jsi::String oldPassword, jsi::String newPassword) = 0;
  virtual jsi::Value deletePasswordUser(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken, jsi::String password) = 0;
  virtual jsi::Value deleteWalletUser(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) = 0;
  virtual jsi::Value logOut(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) = 0;
  virtual jsi::Value logOutSecondaryDevice(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) = 0;
  virtual jsi::Value getOutboundKeysForUser(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String userID) = 0;
  virtual jsi::Value getInboundKeysForUser(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String userID) = 0;
  virtual jsi::Value versionSupported(jsi::Runtime &rt) = 0;
  virtual jsi::Value uploadOneTimeKeys(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::Array contentOneTimePreKeys, jsi::Array notifOneTimePreKeys) = 0;
  virtual jsi::Value getKeyserverKeys(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String keyserverID) = 0;
  virtual jsi::Value getDeviceListForUser(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String userID, std::optional<double> sinceTimestamp) = 0;
  virtual jsi::Value getDeviceListsForUsers(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::Array userIDs) = 0;
  virtual jsi::Value updateDeviceList(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String updatePayload) = 0;
  virtual jsi::Value syncPlatformDetails(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken) = 0;
  virtual jsi::Value uploadSecondaryDeviceKeysAndLogIn(jsi::Runtime &rt, jsi::String userID, jsi::String nonce, jsi::String nonceSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys) = 0;
  virtual jsi::Value logInExistingDevice(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String nonce, jsi::String nonceSignature) = 0;
  virtual jsi::Value findUserIDForWalletAddress(jsi::Runtime &rt, jsi::String walletAddress) = 0;
  virtual jsi::Value findUserIDForUsername(jsi::Runtime &rt, jsi::String username) = 0;
  virtual jsi::Value getFarcasterUsers(jsi::Runtime &rt, jsi::Array farcasterIDs) = 0;
  virtual jsi::Value linkFarcasterAccount(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken, jsi::String farcasterID) = 0;
  virtual jsi::Value unlinkFarcasterAccount(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) = 0;
  virtual jsi::Value findUserIdentities(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::Array userIDs) = 0;

};

template <typename T>
class JSI_EXPORT CommRustModuleSchemaCxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

protected:
  CommRustModuleSchemaCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule("CommRustTurboModule", jsInvoker),
      delegate_(static_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public CommRustModuleSchemaCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      CommRustModuleSchemaCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    jsi::Value generateNonce(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::generateNonce) == 1,
          "Expected generateNonce(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::generateNonce, jsInvoker_, instance_);
    }
    jsi::Value registerPasswordUser(jsi::Runtime &rt, jsi::String username, jsi::String password, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String farcasterID, jsi::String initialDeviceList) override {
      static_assert(
          bridging::getParameterCount(&T::registerPasswordUser) == 13,
          "Expected registerPasswordUser(...) to have 13 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::registerPasswordUser, jsInvoker_, instance_, std::move(username), std::move(password), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature), std::move(contentOneTimeKeys), std::move(notifOneTimeKeys), std::move(farcasterID), std::move(initialDeviceList));
    }
    jsi::Value registerReservedPasswordUser(jsi::Runtime &rt, jsi::String username, jsi::String password, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String keyserverMessage, jsi::String keyserverSignature, jsi::String initialDeviceList) override {
      static_assert(
          bridging::getParameterCount(&T::registerReservedPasswordUser) == 14,
          "Expected registerReservedPasswordUser(...) to have 14 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::registerReservedPasswordUser, jsInvoker_, instance_, std::move(username), std::move(password), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature), std::move(contentOneTimeKeys), std::move(notifOneTimeKeys), std::move(keyserverMessage), std::move(keyserverSignature), std::move(initialDeviceList));
    }
    jsi::Value logInPasswordUser(jsi::Runtime &rt, jsi::String username, jsi::String password, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature) override {
      static_assert(
          bridging::getParameterCount(&T::logInPasswordUser) == 9,
          "Expected logInPasswordUser(...) to have 9 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::logInPasswordUser, jsInvoker_, instance_, std::move(username), std::move(password), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature));
    }
    jsi::Value registerWalletUser(jsi::Runtime &rt, jsi::String siweMessage, jsi::String siweSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String farcasterID, jsi::String initialDeviceList) override {
      static_assert(
          bridging::getParameterCount(&T::registerWalletUser) == 13,
          "Expected registerWalletUser(...) to have 13 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::registerWalletUser, jsInvoker_, instance_, std::move(siweMessage), std::move(siweSignature), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature), std::move(contentOneTimeKeys), std::move(notifOneTimeKeys), std::move(farcasterID), std::move(initialDeviceList));
    }
    jsi::Value registerReservedWalletUser(jsi::Runtime &rt, jsi::String siweMessage, jsi::String siweSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys, jsi::String keyserverMessage, jsi::String keyserverSignature, jsi::String initialDeviceList) override {
      static_assert(
          bridging::getParameterCount(&T::registerReservedWalletUser) == 14,
          "Expected registerReservedWalletUser(...) to have 14 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::registerReservedWalletUser, jsInvoker_, instance_, std::move(siweMessage), std::move(siweSignature), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature), std::move(contentOneTimeKeys), std::move(notifOneTimeKeys), std::move(keyserverMessage), std::move(keyserverSignature), std::move(initialDeviceList));
    }
    jsi::Value logInWalletUser(jsi::Runtime &rt, jsi::String siweMessage, jsi::String siweSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature) override {
      static_assert(
          bridging::getParameterCount(&T::logInWalletUser) == 9,
          "Expected logInWalletUser(...) to have 9 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::logInWalletUser, jsInvoker_, instance_, std::move(siweMessage), std::move(siweSignature), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature));
    }
    jsi::Value updatePassword(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken, jsi::String oldPassword, jsi::String newPassword) override {
      static_assert(
          bridging::getParameterCount(&T::updatePassword) == 6,
          "Expected updatePassword(...) to have 6 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::updatePassword, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken), std::move(oldPassword), std::move(newPassword));
    }
    jsi::Value deletePasswordUser(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken, jsi::String password) override {
      static_assert(
          bridging::getParameterCount(&T::deletePasswordUser) == 5,
          "Expected deletePasswordUser(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::deletePasswordUser, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken), std::move(password));
    }
    jsi::Value deleteWalletUser(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) override {
      static_assert(
          bridging::getParameterCount(&T::deleteWalletUser) == 4,
          "Expected deleteWalletUser(...) to have 4 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::deleteWalletUser, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken));
    }
    jsi::Value logOut(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) override {
      static_assert(
          bridging::getParameterCount(&T::logOut) == 4,
          "Expected logOut(...) to have 4 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::logOut, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken));
    }
    jsi::Value logOutSecondaryDevice(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) override {
      static_assert(
          bridging::getParameterCount(&T::logOutSecondaryDevice) == 4,
          "Expected logOutSecondaryDevice(...) to have 4 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::logOutSecondaryDevice, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken));
    }
    jsi::Value getOutboundKeysForUser(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String userID) override {
      static_assert(
          bridging::getParameterCount(&T::getOutboundKeysForUser) == 5,
          "Expected getOutboundKeysForUser(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getOutboundKeysForUser, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(userID));
    }
    jsi::Value getInboundKeysForUser(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String userID) override {
      static_assert(
          bridging::getParameterCount(&T::getInboundKeysForUser) == 5,
          "Expected getInboundKeysForUser(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getInboundKeysForUser, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(userID));
    }
    jsi::Value versionSupported(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::versionSupported) == 1,
          "Expected versionSupported(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::versionSupported, jsInvoker_, instance_);
    }
    jsi::Value uploadOneTimeKeys(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::Array contentOneTimePreKeys, jsi::Array notifOneTimePreKeys) override {
      static_assert(
          bridging::getParameterCount(&T::uploadOneTimeKeys) == 6,
          "Expected uploadOneTimeKeys(...) to have 6 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::uploadOneTimeKeys, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(contentOneTimePreKeys), std::move(notifOneTimePreKeys));
    }
    jsi::Value getKeyserverKeys(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String keyserverID) override {
      static_assert(
          bridging::getParameterCount(&T::getKeyserverKeys) == 5,
          "Expected getKeyserverKeys(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getKeyserverKeys, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(keyserverID));
    }
    jsi::Value getDeviceListForUser(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String userID, std::optional<double> sinceTimestamp) override {
      static_assert(
          bridging::getParameterCount(&T::getDeviceListForUser) == 6,
          "Expected getDeviceListForUser(...) to have 6 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getDeviceListForUser, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(userID), std::move(sinceTimestamp));
    }
    jsi::Value getDeviceListsForUsers(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::Array userIDs) override {
      static_assert(
          bridging::getParameterCount(&T::getDeviceListsForUsers) == 5,
          "Expected getDeviceListsForUsers(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getDeviceListsForUsers, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(userIDs));
    }
    jsi::Value updateDeviceList(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::String updatePayload) override {
      static_assert(
          bridging::getParameterCount(&T::updateDeviceList) == 5,
          "Expected updateDeviceList(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::updateDeviceList, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(updatePayload));
    }
    jsi::Value syncPlatformDetails(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken) override {
      static_assert(
          bridging::getParameterCount(&T::syncPlatformDetails) == 4,
          "Expected syncPlatformDetails(...) to have 4 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::syncPlatformDetails, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken));
    }
    jsi::Value uploadSecondaryDeviceKeysAndLogIn(jsi::Runtime &rt, jsi::String userID, jsi::String nonce, jsi::String nonceSignature, jsi::String keyPayload, jsi::String keyPayloadSignature, jsi::String contentPrekey, jsi::String contentPrekeySignature, jsi::String notifPrekey, jsi::String notifPrekeySignature, jsi::Array contentOneTimeKeys, jsi::Array notifOneTimeKeys) override {
      static_assert(
          bridging::getParameterCount(&T::uploadSecondaryDeviceKeysAndLogIn) == 12,
          "Expected uploadSecondaryDeviceKeysAndLogIn(...) to have 12 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::uploadSecondaryDeviceKeysAndLogIn, jsInvoker_, instance_, std::move(userID), std::move(nonce), std::move(nonceSignature), std::move(keyPayload), std::move(keyPayloadSignature), std::move(contentPrekey), std::move(contentPrekeySignature), std::move(notifPrekey), std::move(notifPrekeySignature), std::move(contentOneTimeKeys), std::move(notifOneTimeKeys));
    }
    jsi::Value logInExistingDevice(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String nonce, jsi::String nonceSignature) override {
      static_assert(
          bridging::getParameterCount(&T::logInExistingDevice) == 5,
          "Expected logInExistingDevice(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::logInExistingDevice, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(nonce), std::move(nonceSignature));
    }
    jsi::Value findUserIDForWalletAddress(jsi::Runtime &rt, jsi::String walletAddress) override {
      static_assert(
          bridging::getParameterCount(&T::findUserIDForWalletAddress) == 2,
          "Expected findUserIDForWalletAddress(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::findUserIDForWalletAddress, jsInvoker_, instance_, std::move(walletAddress));
    }
    jsi::Value findUserIDForUsername(jsi::Runtime &rt, jsi::String username) override {
      static_assert(
          bridging::getParameterCount(&T::findUserIDForUsername) == 2,
          "Expected findUserIDForUsername(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::findUserIDForUsername, jsInvoker_, instance_, std::move(username));
    }
    jsi::Value getFarcasterUsers(jsi::Runtime &rt, jsi::Array farcasterIDs) override {
      static_assert(
          bridging::getParameterCount(&T::getFarcasterUsers) == 2,
          "Expected getFarcasterUsers(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getFarcasterUsers, jsInvoker_, instance_, std::move(farcasterIDs));
    }
    jsi::Value linkFarcasterAccount(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken, jsi::String farcasterID) override {
      static_assert(
          bridging::getParameterCount(&T::linkFarcasterAccount) == 5,
          "Expected linkFarcasterAccount(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::linkFarcasterAccount, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken), std::move(farcasterID));
    }
    jsi::Value unlinkFarcasterAccount(jsi::Runtime &rt, jsi::String userID, jsi::String deviceID, jsi::String accessToken) override {
      static_assert(
          bridging::getParameterCount(&T::unlinkFarcasterAccount) == 4,
          "Expected unlinkFarcasterAccount(...) to have 4 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::unlinkFarcasterAccount, jsInvoker_, instance_, std::move(userID), std::move(deviceID), std::move(accessToken));
    }
    jsi::Value findUserIdentities(jsi::Runtime &rt, jsi::String authUserID, jsi::String authDeviceID, jsi::String authAccessToken, jsi::Array userIDs) override {
      static_assert(
          bridging::getParameterCount(&T::findUserIdentities) == 5,
          "Expected findUserIdentities(...) to have 5 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::findUserIdentities, jsInvoker_, instance_, std::move(authUserID), std::move(authDeviceID), std::move(authAccessToken), std::move(userIDs));
    }

  private:
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace react
} // namespace facebook
