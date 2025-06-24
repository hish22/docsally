// use std::fs::read;

use pdfium_render::prelude::*;

pub fn extract_pdf(filepath: String) -> Result<String, String> {
    // let bytes = read(&filepath).map_err(|e| format!("Failed to read file: {}", e))?;
    // let out = pdf_extract::extract_text_from_mem(&bytes)
    //     .map_err(|e| format!("Failed to extract PDF file: {}", e))?;

    // println!("{}", extract_pdf_text(&filepath).unwrap());

    // Ok(out)
    let pdfium = Pdfium::new(Pdfium::bind_to_system_library().map_err(|e| e.to_string())?);
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
