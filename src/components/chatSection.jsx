import "./../App.css";
import ChatResponse from "./chatResponse";
import sidebar from "./../assets/icons/app/sidebar.svg";
import settingsIcon from "./../assets/icons/app/settings.svg";
import modelIcon from "./../assets/icons/app/model.png";
import { useEffect, useState } from "react";
export default function ChatSection({ollama,disableChat,setOpenSettings,setOpenModels,openModels,openSettings,disableModelSelection}) {

    const [sidebarStatus,setSidebarStatus] = useState(0);
    const [hideOtherIcons,setHideOtherIcons] = useState(1);

    return (
        <div id="parts-of-chats">
                {/* <CurrentChats /> */}
            <div id="text-chat-div">
                <div className="flex-between">
                    {/* {sidebarStatus ? <p>{ollama}</p> : null } */}
                    <img src={sidebar} width={35} id="chat-sidebar" onClick={() => {
                        setSidebarStatus(1 - sidebarStatus)
                        setHideOtherIcons(1 - hideOtherIcons)
                    }}/>
                </div>
                <div>
                    {!disableModelSelection ? 
                        <img src={modelIcon} width={35} id="chat-sidebar" className="mt-4" style={hideOtherIcons ? {display: "block"} : {display: "none"}} onClick={() => setOpenModels(1 - openModels)}/>
                    :
                        <img src={modelIcon} width={35} id="chat-sidebar-disabled" className="mt-4" style={(hideOtherIcons ? {display: "block", opacity: "0.5"} : {display: "none"}) }/>
                    }
                </div>
                <div>
                    <img src={settingsIcon} width={35} id="chat-sidebar" onClick={() => setOpenSettings(true)} className="mt-4" style={hideOtherIcons ? {display: "block"} : {display: "none"}}/>
                </div>
                <ChatResponse check={sidebarStatus} ollama={ollama} disableChat={disableChat}/>
            </div>
        </div>
    );
}