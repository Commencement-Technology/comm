//! Messages sent from client to Identity Search Server

pub mod auth_messages;
pub mod search_query;
pub mod search_result;

pub use auth_messages::*;
pub use search_query::*;
pub use search_result::*;

use serde::{Deserialize, Serialize};
pub use websocket_messages::{
  ConnectionInitializationResponse, ConnectionInitializationStatus, Heartbeat,
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum Messages {
  IdentitySearchAuthMessage(IdentitySearchAuthMessage),
  IdentitySearchQuery(IdentitySearchQuery),
  Heartbeat(Heartbeat),
  ConnectionInitializationResponse(ConnectionInitializationResponse),
  IdentitySearchResult(IdentitySearchResult),
}
