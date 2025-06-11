import ChatSection from "./chatSection";
import DocumentSection from "./documentSection";
import "./../App.css";

export default function UpperSection({ollama}) {
    return (
        <section id="upper-section">
            <ChatSection ollama={ollama} />
            <DocumentSection />
        </section>
    );
}