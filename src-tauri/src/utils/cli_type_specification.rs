pub fn cmd_type() -> Vec<String> {
    let os = os_info::get();
    let mut args = vec![];
    match os.os_type() {
        os_info::Type::Windows => {
            args.push("powershell".to_string());
            args.push("/C".to_string());
        }
        os_info::Type::Ubuntu => {
            args.push("bash".to_string());
            args.push("-c".to_string());
        }
        _ => {
            args.push("unknown".to_string());
        }
    }
    args
}
