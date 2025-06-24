import ChatSection from "./chatSection";
import DocumentSection from "./documentSection";
import "./../App.css";
import { useState } from "react";

export default function UpperSection({ollama,selectedModel}) {

    const [disableChat,setDisableChat] = useState(true);

    return (
        <section id="upper-section">
            <ChatSection ollama={ollama} disableChat={disableChat}/>
            <DocumentSection ollama={ollama} setDisableChat={setDisableChat} selectedModel={selectedModel}/>
        </section>
    );
}