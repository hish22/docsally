use std::process::Command;

use crate::utils::cli_type_specification::cmd_type;
#[tauri::command]
pub fn ollama_list() -> Vec<String> {
    let opitions = cmd_type();

    let cmd = Command::new(&opitions[0])
        .args([&opitions[1], "ollama list"])
        .output()
        .expect("failed to execute cmd process");

    let mut models: Vec<String> = Vec::new();
    if cmd.status.success() {
        let list = String::from_utf8_lossy(&cmd.stdout).to_string();
        let listvec: Vec<String> = list.split('\n').map(|s| s.to_string()).collect();
        for i in 1..listvec.len().saturating_sub(1) {
            let model_name: Vec<&str> = listvec[i].split_whitespace().collect();
            models.push(model_name.get(0).unwrap().to_string());
        }
    }
    return models;
}
