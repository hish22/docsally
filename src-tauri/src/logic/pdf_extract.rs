use std::fs::read;

pub fn extract_pdf(filepath: String) -> String {
    let bytes = read(filepath).unwrap();
    let out = pdf_extract::extract_text_from_mem(&bytes).unwrap();
    out
}
