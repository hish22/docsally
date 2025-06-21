use std::fs::read;

// fn chunk_text(text: String, chunk_size: usize, overlap: usize) -> Vec<String> {
//     let mut chunks = vec![];
//     let mut start = 0;
//     while start < text.len() {
//         let end = (start + chunk_size).min(text.len());
//         chunks.push(text[start..end].to_string());
//         start += chunk_size - overlap;
//     }
//     chunks
// }

pub fn extract_pdf(filepath: String) -> String {
    let bytes = read(filepath).unwrap();
    let out = pdf_extract::extract_text_from_mem(&bytes).unwrap();
    out
    // return chunk_text(out, 1000, 200);
}
