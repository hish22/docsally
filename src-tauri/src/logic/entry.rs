use langchain_rust::{
    chain::{Chain, ConversationalRetrieverChainBuilder},
    llm::{ollama::openai::OllamaConfig, OpenAI},
    prompt_args,
    vectorstore::Retriever,
};

use crate::logic::{
    db_embedding::db_embedding, ollama_embeddings::ollama_embedder, pdf_extract::extract_pdf,
};

// Computed when needed!
// fn chunk_vector(vector: &Vec<f64>, chunk_size: usize, overlap: usize) -> Vec<Vec<f64>> {
//     let mut chunk_start = 0;
//     let mut chunk_end = chunk_size;
//     let mut chunks = vec![];
//     while vector.len() > chunk_start {
//         let part = vector[chunk_start..chunk_end].to_vec();
//         chunk_start += chunk_size - overlap;
//         chunks.push(part);
//     }
//     chunks
// }

#[tauri::command]
pub async fn entry(file: String) {
    let content = extract_pdf(file);
    let store = db_embedding(ollama_embedder(), content).await;

    let llm = OpenAI::new(OllamaConfig::default()).with_model("gemma3");

    let chain = ConversationalRetrieverChainBuilder::new()
        .llm(llm)
        .rephrase_question(true)
        .retriever(Retriever::new(store, 4))
        .build()
        .expect("Error building ConversationalChain");
    let input = prompt_args! {
            "question" => "Why the amount of memory required to store a value should be minimized?",
    };

    let result = chain.invoke(input).await;

    println!("{}", result.unwrap());

    // let input = prompt_args! {
    //         "question" => "When did the war ended?",
    // };

    // let result = chain.invoke(input).await;

    // println!("{}", result.unwrap());

    // let embeddings = ollama_embeddings(content);
    // let content = embeddings.await;
    // let result: Vec<Vec<f64>> = chunk_vector(&content[0], 1536, 100);
}
