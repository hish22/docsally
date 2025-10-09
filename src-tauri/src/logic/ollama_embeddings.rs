//! # Ollama Embeddings Module
//! 
//! Factory function for creating Ollama-based embedding models using the Nomic Embed Text model.

use langchain_rust::embedding::openai::OpenAiEmbedder;
use langchain_rust::llm::ollama::openai::OllamaConfig;

/// Creates an Ollama embedder configured with the Nomic Embed Text model.
/// 
/// Returns a pre-configured `OpenAiEmbedder` instance ready for generating
/// vector embeddings from text content.
/// 
/// # Returns
/// 
/// A configured `OpenAiEmbedder<OllamaConfig>` instance.
/// 
/// # Example
/// 
/// ```rust
/// let embedder = ollama_embedder();
/// ```
pub fn ollama_embedder() -> OpenAiEmbedder<OllamaConfig> {
    return OpenAiEmbedder::new(OllamaConfig::default()).with_model("nomic-embed-text");
}
