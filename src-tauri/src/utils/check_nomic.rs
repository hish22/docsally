use std::process::Command;

use crate::utils::cli_type_specification::cmd_type;

#[tauri::command]
pub fn check_nomic() -> bool {
    let opitions = cmd_type();

    let child_version: std::process::Output = Command::new(&opitions[0])
        .args([&opitions[1], "ollama show nomic-embed-text"])
        .output()
        .expect("failed of installing nomic-embed-text");

    return child_version.status.success();
}
