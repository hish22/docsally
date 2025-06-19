import { useEffect, useState } from "react";
import "./../App.css";

export default function ChatResponse(props) {

    const [userRes,setUserRes] = useState([]);
    const [chatRes,setChatRes] = useState([]);
    const [prompt,setPrompt] = useState("");
    const [isPressed,setIsPressed] = useState(props.check);

    const addToUserRes = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (prompt.trim() !== "" && props.ollama !== "") {
                console.log(prompt);
                setUserRes([...userRes,prompt]);
                setPrompt("");
            }
        }
    };

        // const addToChatRes = (event) => {
    //     if (prompt.trim !== "") {
    //         setUserRes([...userRes,prompt]);
    //         setPrompt("");
    //     }
    // }

    useEffect(() => {
        setIsPressed(props.check);
    },[props.check])

    return (
    <>
        {isPressed ? (
            <div className="chat-container">
                {userRes.map((item, index) => (
                <div className="chat-box left" key={index}>
                    {item}
                </div>
                ))}
            </div>
            ) : null}
            {/* <div className="chat-box right">I'm good, thanks! How about you?</div> */}
        <form className="center" id="chatForm">
            <textarea placeholder="Chat..." name="chatInput" onKeyDown={addToUserRes} value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
        </form>
    </>
    )
}