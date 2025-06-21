use langchain_rust::embedding::openai::OpenAiEmbedder;
use langchain_rust::llm::ollama::openai::OllamaConfig;

pub fn ollama_embedder() -> OpenAiEmbedder<OllamaConfig> {
    // let ollama = OpenAiEmbedder::new(OllamaConfig::default()).with_model("nomic-embed-text")

    // let res = ollama.embed_documents(&pdf_stream).await.unwrap();

    return OpenAiEmbedder::new(OllamaConfig::default()).with_model("nomic-embed-text");
}
