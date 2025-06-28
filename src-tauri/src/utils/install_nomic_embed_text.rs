use std::process::Command;

#[tauri::command]
pub fn install_nemt() -> bool {
    let child: std::process::Output = Command::new("powershell")
        .args(["/C", "ollama pull nomic-embed-text"])
        .output()
        .expect("failed of installing nomic-embed-text");
    return child.status.success();
}
