#[tauri::command]
pub fn check_system() -> bool {
    let os = os_info::get();
    match os.os_type() {
        os_info::Type::Windows => true,
        os_info::Type::Ubuntu => true,
        _ => false,
    }
}
