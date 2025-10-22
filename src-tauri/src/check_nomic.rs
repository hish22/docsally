use std::process::{Command, ExitStatus};

use crate::utils::cli_type_specification::cmd_type;

#[tauri::command]
pub fn check_nomic() -> ExitStatus {
    let opitions = cmd_type();

    Command::new(&opitions[0])
        .args([&opitions[1], "ollama show nomic-embed-text"])
        .status()
        .expect("failed of installing nomic-embed-text")

}
