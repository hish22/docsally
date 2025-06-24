use std::process::Command;

#[tauri::command]
pub fn ollama_list() -> Vec<String> {
    let cmd = Command::new(cmd_type())
        .args(["/C", "ollama list"])
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

fn cmd_type() -> String {
    let os = os_info::get();
    match os.os_type() {
        os_info::Type::Windows => "powershell".to_string(),
        os_info::Type::Ubuntu => "bash".to_string(),
        _ => "Unknown".to_string()
    }
}