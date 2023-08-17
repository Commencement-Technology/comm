use clap::Parser;
use once_cell::sync::Lazy;
use tracing::info;

use crate::constants::DEFAULT_BLOB_SERVICE_URL;

#[derive(Parser)]
#[command(version, about, long_about = None)]
pub struct AppConfig {
  /// AWS Localstack service URL
  #[arg(env = "LOCALSTACK_ENDPOINT")]
  #[arg(long)]
  pub localstack_endpoint: Option<String>,
  /// Blob service URL
  #[arg(long, default_value_t = DEFAULT_BLOB_SERVICE_URL.to_string())]
  pub blob_service_url: String,
}

/// Stores configuration parsed from command-line arguments
/// and environment variables
pub static CONFIG: Lazy<AppConfig> = Lazy::new(|| AppConfig::parse());

/// Processes the command-line arguments and environment variables.
/// Should be called at the beginning of the `main()` function.
pub(super) fn parse_cmdline_args() {
  // force evaluation of the lazy initialized config
  Lazy::force(&CONFIG);
}

/// Provides region/credentials configuration for AWS SDKs
pub async fn load_aws_config() -> aws_types::SdkConfig {
  let mut config_builder = aws_config::from_env();

  if let Some(endpoint) = &CONFIG.localstack_endpoint {
    info!("Using Localstack. AWS endpoint URL: {}", endpoint);
    config_builder = config_builder.endpoint_url(endpoint);
  }

  config_builder.load().await
}
