//! Utilities for detecting the presence of the Nomic "nomic-embed-text" model.
//!
//! This file exposes a small Tauri command that runs the host `ollama` binary
//! to check whether the `nomic-embed-text` model is available (via
//! `ollama show nomic-embed-text`). The command returns the underlying
//! process `ExitStatus` so callers can inspect success/failure.

use std::process::{Command, ExitStatus};

use crate::utils::cli_type_specification::cmd_type;

/// Runs `ollama show nomic-embed-text` using the CLI command parts returned
/// by `cmd_type()`.
///
/// Returns the process `ExitStatus`. Exposed as a Tauri command so the
/// frontend can determine whether the required Nomic model is present.
#[tauri::command]
pub fn check_nomic() -> ExitStatus {
    let opitions = cmd_type();

    Command::new(&opitions[0])
        .args([&opitions[1], "ollama show nomic-embed-text"])
        .status()
        .expect("failed of find nomic-embed-text")
}
