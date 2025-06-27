import { useEffect, useState, useRef, useContext } from "react";
import "./../App.css";
import { invoke } from "@tauri-apps/api/core";
import Markdown from "react-markdown";
import { listen } from "@tauri-apps/api/event";
import loading from "./../assets/icons/animated/fade-stagger-squares.svg";

export default function ChatResponse(props) {
    const [response, setResponse] = useState([]);
    const [question, setQuestion] = useState("");
    const [isPressed, setIsPressed] = useState(props.check);
    const [chunkRes, setChunkRes] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);

    const [isLoading,setIsLoading] = useState(false);

    const hasSubscribed = useRef(false);
    const streamEndUnlisten = useRef(null);
    const streamUnlisten = useRef(null);
    const chunksRef = useRef([]); // Store chunks in ref to avoid closure issues

    const addToUserRes = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            setIsLoading(true);
            if (question.trim() !== "" && props.ollama !== "") {
                setResponse((prev) => [...prev, {
                    "type": "user",
                    "text": question
                }]);
                setQuestion("");
                setChunkRes([]); // Clear previous chunks
                chunksRef.current = []; // Clear ref as well
                setIsStreaming(true);
            }
        }
    };

    const addToChatRes = async (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (question.trim() !== "" && props.ollama !== "") {
                try {
                    await invoke("ask_question", { question: question });
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error invoking ask_question:", error);
                    setIsStreaming(false);
                }
            }
        }
    };

    useEffect(() => {
        if (hasSubscribed.current) return;
        hasSubscribed.current = true;
        
        const setupListeners = async () => {
            try {
                // Listen for streaming content
                streamUnlisten.current = await listen("content-stream", (event) => {
                    const newChunk = event.payload;
                    setIsLoading(false);
                    chunksRef.current = [...chunksRef.current, newChunk]; // Update ref
                    setChunkRes((prev) => [...prev, newChunk]); // Update state for UI
                });

                // Listen for stream end
                streamEndUnlisten.current = await listen("content-stream-end", (event) => {
                    // Use the ref value which has the current chunks
                    const allChunks = chunksRef.current.join("");
                    setResponse((prev) => [...prev, {
                        "type": "bot",
                        "text": allChunks
                    }]);
                    setChunkRes([]); // Clear chunks after adding to response
                    chunksRef.current = []; // Clear ref as well
                    setIsStreaming(false);
                });
            } catch (error) {
                console.error("Error setting up listeners:", error);
            }
        };

        setupListeners();

        // Cleanup function
        return () => {
            if (streamUnlisten.current) {
                streamUnlisten.current();
            }
            if (streamEndUnlisten.current) {
                streamEndUnlisten.current();
            }
        };
    }, []);

    // Fix: Move chunkRes dependency to a separate effect
    useEffect(() => {
        // This effect handles the final response when streaming ends
        // The actual logic is in the event listener above
    }, [chunkRes]);

    useEffect(() => {
        setIsPressed(props.check);
    }, [props.check]);
    return (
        <>
            {isPressed ? (
                <div id="chat-container">
                    {response.map((item, index) => (
                        item.type === "user" ? 
                            <div className="chat-box left" key={index}>
                                <Markdown>{item.text}</Markdown>
                            </div> :
                            <div className="chat-box right" key={index}>
                                <Markdown>{item.text}</Markdown>
                            </div>
                    ))}
                    {/* Show streaming response */}

                    {isLoading ? 
                        (
                            <div className="chat-box right streaming">
                                <img src={loading} width={20} />
                            </div>
                        )
                        :
                        isStreaming && chunkRes.length > 0 && (
                            <div className="chat-box right streaming">
                                <Markdown>{chunkRes.join("")}</Markdown>
                            </div>
                        )
                    }

                    
                </div>
            ) : null}
            <form className="center" id="chatForm">
                <textarea 
                    placeholder="Chat..." 
                    name="chatInput" 
                    onKeyDown={(e) => {
                        addToUserRes(e); 
                        addToChatRes(e);
                    }} 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={ isStreaming || (!isStreaming && props.disableChat)}
                />
            </form>
        </>
    );
}