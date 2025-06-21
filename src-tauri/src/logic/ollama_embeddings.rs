use langchain_rust::embedding::openai::OpenAiEmbedder;
use langchain_rust::llm::ollama::openai::OllamaConfig;

pub fn ollama_embedder() -> OpenAiEmbedder<OllamaConfig> {
    return OpenAiEmbedder::new(OllamaConfig::default()).with_model("nomic-embed-text");
}
