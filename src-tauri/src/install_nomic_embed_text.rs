//! Helpers to install the Nomic `nomic-embed-text` model.
//!
//! This module exposes a single convenience function, `install_nemt()`, which
//! runs the platform-appropriate bundled installer script located in `bin/`.
//!
//! - On Linux it runs `sh bin/inet.sh`.
//! - On Windows it runs `cmd /C bin\inet.cmd`.
//!
//! The function returns the child process `ExitStatus` so callers can inspect
//! whether the install succeeded.

use std::{
    path::PathBuf,
    process::{Command, ExitStatus},
};

/// Installs the `nomic-embed-text` model by invoking the packaged install
/// script for the current platform.
///
/// Returns the `ExitStatus` from the spawned installer process.
pub fn install_nemt() -> ExitStatus {
    let root_dir = match std::env::current_dir() {
        Ok(r) => r,
        Err(e) => {
            eprintln!("Failed to fetch current_dir: {}", e);
            PathBuf::new()
        }
    };

    #[cfg(target_os = "linux")]
    {
        Command::new("sh")
            .arg(root_dir.join("bin/inet.sh"))
            .status()
            .expect("failed of installing nomic-embed-text")
    }

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(&["/C", root_dir.join("bin\\inet.cmd").to_str().unwrap()])
            .status()
            .expect("failed of installing nomic-embed-text")
    }
}
