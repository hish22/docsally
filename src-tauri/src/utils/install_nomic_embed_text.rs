use std::process::Command;

use crate::utils::cli_type_specification::cmd_type;

#[tauri::command]
pub fn install_nemt() -> bool {
    let opitions = cmd_type();

    let child: std::process::Output = Command::new(&opitions[0])
        .args([&opitions[1], "ollama pull nomic-embed-text"])
        .output()
        .expect("failed of installing nomic-embed-text");
    return child.status.success();
}
