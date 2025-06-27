use std::process::Command;

#[tauri::command]
pub fn install_nemt() -> bool {
    let child_version: std::process::Output = Command::new("powershell")
        .args(["/C", "ollama show nomic-embed-text"])
        .output()
        .expect("failed of installing nomic-embed-text");

    if child_version.status.success() {
        return child_version.status.success();
    } else {
        println!("{}", String::from_utf8_lossy(&child_version.stdout));
        let child: std::process::Output = Command::new("powershell")
            .args(["/C", "ollama pull nomic-embed-text"])
            .output()
            .expect("failed of installing nomic-embed-text");
        return child.status.success();
    }
}
