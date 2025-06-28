import ChatSection from "./chatSection";
import DocumentSection from "./documentSection";
import "./../App.css";
import { useState } from "react";

export default function UpperSection({setPageNumber,ollama,selectedModel,setDisableModelSelection}) {

    const [disableChat,setDisableChat] = useState(true);

    return (
        <section id="upper-section">
            <ChatSection ollama={ollama} disableChat={disableChat}/>
            <DocumentSection setPageNumber={setPageNumber} ollama={ollama} setDisableChat={setDisableChat} selectedModel={selectedModel} setDisableModelSelection={setDisableModelSelection}/>
        </section>
    );
}