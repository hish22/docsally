use std::process::Command;

#[tauri::command]
pub fn check_nomic() -> bool {
    let child_version: std::process::Output = Command::new("powershell")
        .args(["/C", "ollama show nomic-embed-text"])
        .output()
        .expect("failed of installing nomic-embed-text");

    return child_version.status.success();
}
