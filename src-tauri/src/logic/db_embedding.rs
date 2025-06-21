use langchain_rust::{
    embedding::openai::OpenAiEmbedder,
    llm::ollama::openai::OllamaConfig,
    schemas::Document,
    vectorstore::{
        surrealdb::{Store, StoreBuilder},
        VecStoreOptions, VectorStore,
    },
};
use surrealdb::engine::any::Any;

fn chunk_text(text: &str, chunk_size: usize, overlap: usize) -> Vec<String> {
    let mut chunks = Vec::new();
    let mut start = 0;

    while start < text.len() {
        let end = (start + chunk_size).min(text.len());
        chunks.push(text[start..end].to_string());
        start += chunk_size - overlap;
    }

    chunks
}

pub async fn db_embedding(
    ollama_embedder: OpenAiEmbedder<OllamaConfig>,
    doc_data: String,
) -> Store<Any> {
    let db_url = "memory".to_string();

    let surrealdb_config = surrealdb::opt::Config::new()
        .set_strict(true)
        .capabilities(surrealdb::opt::capabilities::Capabilities::all());

    let db = surrealdb::engine::any::connect((db_url, surrealdb_config))
        .await
        .unwrap();

    db.query("DEFINE NAMESPACE ollama;")
        .await
        .unwrap()
        .check()
        .unwrap();
    db.query("USE NAMESPACE ollama; DEFINE DATABASE vectors;")
        .await
        .unwrap()
        .check()
        .unwrap();

    db.use_ns("ollama").await.unwrap();
    db.use_db("vectors").await.unwrap();

    // init the surrealDB vector store
    let store = StoreBuilder::new()
        .embedder(ollama_embedder)
        .db(db)
        .vector_dimensions(768)
        .build()
        .await
        .unwrap();

    store.initialize().await.unwrap();

    let chunks = chunk_text(&doc_data, 1000, 200); // adjust size/overlap
    let documents: Vec<Document> = chunks.into_iter().map(Document::new).collect();

    // let doc = Document::new(doc_data);

    store
        .add_documents(&documents, &VecStoreOptions::default())
        .await
        .unwrap();

    println!("Document added successfully!");

    store
}
