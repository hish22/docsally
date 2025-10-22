use std::process::{Command, ExitStatus};

pub fn install_nemt() -> ExitStatus {
    let root_dir = std::env::current_dir().unwrap();

    #[cfg(target_os = "linux")]
    {
        Command::new("sh")
            .arg(root_dir.join("bin/inet.sh"))
            .status()
            .expect("failed of installing nomic-embed-text")
    }

    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(&["/C", root_dir.join("bin\\inet.cmd").to_str().unwrap()])
            .status()
            .expect("failed of installing nomic-embed-text")
    }
}
