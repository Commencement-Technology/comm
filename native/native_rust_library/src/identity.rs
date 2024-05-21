use grpc_clients::identity::get_unauthenticated_client;
use grpc_clients::identity::protos::unauth::{
  AuthResponse, DeviceKeyUpload, Empty, IdentityKeyInfo, Prekey,
};
use serde::Serialize;

use crate::utils::jsi_callbacks::{
  handle_bool_result_as_callback, handle_string_result_as_callback,
};
use crate::{Error, RUNTIME};
use crate::{CODE_VERSION, DEVICE_TYPE, IDENTITY_SOCKET_ADDR};

pub mod account_actions;
pub mod device_list;
pub mod exact_user_search;
pub mod farcaster;
pub mod find_user_identities;
pub mod login;
pub mod registration;
pub mod x3dh;

pub mod ffi {
  use super::*;

  pub use account_actions::ffi::*;
  pub use device_list::ffi::*;
  pub use exact_user_search::ffi::*;
  pub use farcaster::ffi::*;
  pub use find_user_identities::ffi::*;
  pub use login::ffi::*;
  pub use registration::ffi::*;
  pub use x3dh::ffi::*;

  pub fn generate_nonce(promise_id: u32) {
    RUNTIME.spawn(async move {
      let result = fetch_nonce().await;
      handle_string_result_as_callback(result, promise_id);
    });
  }

  pub fn version_supported(promise_id: u32) {
    RUNTIME.spawn(async move {
      let result = version_supported_helper().await;
      handle_bool_result_as_callback(result, promise_id);
    });
  }
}

// helper structs

pub struct AuthInfo {
  pub user_id: String,
  pub device_id: String,
  pub access_token: String,
}

pub struct DeviceKeys {
  pub key_payload: String,
  pub key_payload_signature: String,
  pub content_prekey: String,
  pub content_prekey_signature: String,
  pub notif_prekey: String,
  pub notif_prekey_signature: String,
  pub content_one_time_keys: Vec<String>,
  pub notif_one_time_keys: Vec<String>,
}

impl From<DeviceKeys> for DeviceKeyUpload {
  fn from(value: DeviceKeys) -> Self {
    let DeviceKeys {
      key_payload,
      key_payload_signature,
      content_prekey,
      content_prekey_signature,
      notif_prekey,
      notif_prekey_signature,
      content_one_time_keys,
      notif_one_time_keys,
    } = value;
    Self {
      device_key_info: Some(IdentityKeyInfo {
        payload: key_payload,
        payload_signature: key_payload_signature,
      }),
      content_upload: Some(Prekey {
        prekey: content_prekey,
        prekey_signature: content_prekey_signature,
      }),
      notif_upload: Some(Prekey {
        prekey: notif_prekey,
        prekey_signature: notif_prekey_signature,
      }),
      one_time_content_prekeys: content_one_time_keys,
      one_time_notif_prekeys: notif_one_time_keys,
      device_type: DEVICE_TYPE.into(),
    }
  }
}

pub struct LogInPasswordUserInfo {
  pub username: String,
  pub password: String,
  pub device_keys: DeviceKeys,
}

pub struct RegisterPasswordUserInfo {
  pub username: String,
  pub password: String,
  pub device_keys: DeviceKeys,
  pub farcaster_id: Option<String>,
  pub initial_device_list: String,
}

pub struct RegisterReservedPasswordUserInfo {
  pub username: String,
  pub password: String,
  pub device_keys: DeviceKeys,
  pub keyserver_message: String,
  pub keyserver_signature: String,
  pub initial_device_list: String,
}

pub struct LogInWalletUserInfo {
  pub siwe_message: String,
  pub siwe_signature: String,
  pub device_keys: DeviceKeys,
}

pub struct RegisterWalletUserInfo {
  pub siwe_message: String,
  pub siwe_signature: String,
  pub device_keys: DeviceKeys,
  pub farcaster_id: Option<String>,
  pub initial_device_list: String,
}

pub struct RegisterReservedWalletUserInfo {
  pub siwe_message: String,
  pub siwe_signature: String,
  pub device_keys: DeviceKeys,
  pub keyserver_message: String,
  pub keyserver_signature: String,
  pub initial_device_list: String,
}

/// Counterpart of proto [`AuthResponse`] message
/// that implements the `Serialize` trait.
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct IdentityAuthResult {
  #[serde(rename = "userID")]
  user_id: String,
  access_token: String,
  username: String,
}

impl From<AuthResponse> for IdentityAuthResult {
  fn from(value: AuthResponse) -> Self {
    let AuthResponse {
      user_id,
      access_token,
      username,
    } = value;
    Self {
      user_id,
      access_token,
      username,
    }
  }
}

// API implementation helpers

async fn fetch_nonce() -> Result<String, Error> {
  let mut identity_client = get_unauthenticated_client(
    IDENTITY_SOCKET_ADDR,
    CODE_VERSION,
    DEVICE_TYPE.as_str_name().to_lowercase(),
  )
  .await?;
  let nonce = identity_client
    .generate_nonce(Empty {})
    .await?
    .into_inner()
    .nonce;
  Ok(nonce)
}

async fn version_supported_helper() -> Result<bool, Error> {
  let mut identity_client = get_unauthenticated_client(
    IDENTITY_SOCKET_ADDR,
    CODE_VERSION,
    DEVICE_TYPE.as_str_name().to_lowercase(),
  )
  .await?;
  let response = identity_client.ping(Empty {}).await;
  match response {
    Ok(_) => Ok(true),
    Err(e) => {
      if grpc_clients::error::is_version_unsupported(&e) {
        Ok(false)
      } else {
        Err(e.into())
      }
    }
  }
}
