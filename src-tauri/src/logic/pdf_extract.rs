use pdfium_render::prelude::*;

pub fn extract_pdf(filepath: String) -> Result<String, String> {
    println!("{}", handle_os());
    let lib = Pdfium::bind_to_library(handle_os());
    let pdfium = Pdfium::new(lib.map_err(|e| e.to_string())?);
    let document = pdfium
        .load_pdf_from_file(&filepath, None)
        .map_err(|e| e.to_string())?;

    let mut text = String::new();
    for page in document.pages().iter() {
        let content = page.text().map_err(|e| e.to_string())?;
        text.push_str(&content.all());
        text.push('\n');
    }

    Ok(text)
}

fn handle_os() -> String {
    let os = os_info::get();
    match os.os_type() {
        os_info::Type::Windows => match os.architecture().unwrap() {
            "x86_64" => "lib/dll/windows/x86_64/pdfium.dll".to_string(),
            "x86" => "lib/dll/windows/x86/pdfium.dll".to_string(),
            "arm64" => "lib/dll/windows/arm64/pdfium.dll".to_string(),
            _ => "Unknown".to_string(),
        },
        os_info::Type::Ubuntu => match os.architecture().unwrap() {
            "x86_64" => "lib/dll/linux/glibc/x86_64/libpdfium.so".to_string(),
            "x86" => "lib/dll/linux/glibc/x86/libpdfium.so".to_string(),
            "arm64" => "lib/dll/linux/glibc/arm64/libpdfium.so".to_string(),
            _ => "Unknown".to_string(),
        },
        _ => "Unknown".to_string(),
    }
}

// pub fn extract_pdf_text(path: &str) -> Result<String, String> {
//     let pdfium = Pdfium::new(Pdfium::bind_to_system_library().map_err(|e| e.to_string())?);
//     let document = pdfium
//         .load_pdf_from_file(path, None)
//         .map_err(|e| e.to_string())?;

//     let mut text = String::new();
//     for page in document.pages().iter() {
//         let content = page.text().map_err(|e| e.to_string())?;
//         text.push_str(&content.all());
//         text.push('\n');
//     }

//     Ok(text)
// }
