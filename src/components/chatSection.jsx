import "./../App.css";
import ChatResponse from "./chatResponse";
import CurrentChats from "./currentChats";
import sidebar from "./../assets/sidebar.svg";
import { useState } from "react";
export default function ChatSection({ollama}) {

    const [sidebarStatus,setSidebarStatus] = useState(0);

    return (
        <div id="parts-of-chats">
                {/* <CurrentChats /> */}
            <div id="text-chat-div">
                <div className="flex-between">
                    {/* <p>{ollama}</p> */}
                    <img src={sidebar} width={35} id="chat-sidebar" onClick={() => setSidebarStatus(1 - sidebarStatus)}/>
                </div>
                <ChatResponse check={sidebarStatus}/>
            </div>
        </div>
    );
}