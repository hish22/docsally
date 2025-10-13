import "./../App.css";
import ChatResponse from "./chatResponse";
import sidebar from "./../assets/icons/app/sidebar.svg";
import settingsIcon from "./../assets/icons/app/settings.svg";
import modelIcon from "./../assets/icons/app/model.png";
import { useState } from "react";
export default function ChatSection({ollama,disableChat,setOpenSettings}) {

    const [sidebarStatus,setSidebarStatus] = useState(0);

    return (
        <div id="parts-of-chats">
                {/* <CurrentChats /> */}
            <div id="text-chat-div">
                <div className="flex-between">
                    {/* {sidebarStatus ? <p>{ollama}</p> : null } */}
                    <img src={sidebar} width={35} id="chat-sidebar" onClick={() => setSidebarStatus(1 - sidebarStatus)}/>
                </div>
                <div>
                    <img src={modelIcon} width={35} id="chat-sidebar" className="mt-4"/>
                </div>
                <div>
                    <img src={settingsIcon} width={35} id="chat-sidebar" onClick={() => setOpenSettings(true)} className="mt-4"/>
                </div>
                <ChatResponse check={sidebarStatus} ollama={ollama} disableChat={disableChat}/>
            </div>
        </div>
    );
}