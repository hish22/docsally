//! Database embedding functionality
//!
//! This module handles text chunking, embedding generation, and storage
//! in a SurrealDB vector database for similarity search.
//!
//! The process involves:
//! 1. Splitting text into overlapping chunks
//! 2. Generating embeddings using Ollama
//! 3. Storing embeddings in SurrealDB for retrieval

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

/// Splits text into overlapping chunks for embedding processing
///
/// Ensures chunks respect character boundaries to avoid splitting UTF-8 sequences.
/// Uses overlap to maintain context between adjacent chunks.
fn chunk_text(text: &str, chunk_size: usize, overlap: usize) -> Vec<String> {
    let mut chunks = Vec::new();
    let mut start = 0;
    while start < text.len() {
        let mut end = (start + chunk_size).min(text.len());
        while !text.is_char_boundary(end) {
            end = end - 1;
        }
        while !text.is_char_boundary(start) && start != 0 {
            start = start - 1;
        }
        chunks.push(text[start..end].to_string());
        start += chunk_size - overlap;
    }

    chunks
}

/// Creates embeddings and stores them in SurrealDB vector database
///
/// Sets up an in-memory SurrealDB instance, configures the vector store,
/// chunks the input text, generates embeddings, and stores them for retrieval.
///
/// # Arguments
/// * `ollama_embedder` - The embedding model to use for generating vectors
/// * `doc_data` - Text content to embed and store
///
/// # Returns
/// Configured vector store ready for similarity search operations
pub async fn db_embedding(
    ollama_embedder: OpenAiEmbedder<OllamaConfig>,
    doc_data: String,
    chunk_size: usize,
    overlap: usize,
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

    let chunks = chunk_text(&doc_data, chunk_size, overlap); // adjust size/overlap
    let documents: Vec<Document> = chunks.into_iter().map(Document::new).collect();

    // let doc = Document::new(doc_data);

    store
        .add_documents(&documents, &VecStoreOptions::default())
        .await
        .unwrap();

    store
}
