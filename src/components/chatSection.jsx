import "./../App.css";
import ChatResponse from "./chatResponse";
import sidebar from "./../assets/icons/app/sidebar.svg";
import settingsIcon from "./../assets/icons/app/settings.svg";
import modelIcon from "./../assets/icons/app/model.png";
import saveAsIcon from "./../assets/icons/app/save.svg";
import saveIcon from "./../assets/icons/app/save_2.svg";
import { useEffect, useState } from "react";
import InsertNewChat from "../util/store/insert/insertNewChat";
export default function ChatSection({ollama,
    disableChat,
    setOpenSettings,
    setOpenModels,
    openModels,
    openSettings,
    disableModelSelection,
    pageNumber,
    disableSaveButton,
    uploadedFile,
    setOpenSaveAsPanel,
    setChats,
    fileID,
    stateID,
    stateChatID,
    savedChats,
    chats,
    setChatSeq,
    chatSeq,
    showNotify,
    setShowNotify
}) {

    const [sidebarStatus,setSidebarStatus] = useState(0);
    const [hideOtherIcons,setHideOtherIcons] = useState(1);

    const showErr = (e) => {
        setShowNotify(true);
        { showNotify && <Notify message={e} onClose={() => setShowNotify(false)}/>}
    }

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
                        {!disableModelSelection && !savedChats ? 
                            <img src={modelIcon} width={35} id="chat-sidebar" className="mt-4" style={hideOtherIcons ? {display: "block"} : {display: "none"}} onClick={() => setOpenModels(1 - openModels)}/>
                        :
                            <img src={modelIcon} width={35} id="chat-sidebar-disabled" className="mt-4" style={(hideOtherIcons ? {display: "block", opacity: "0.5"} : {display: "none"}) }/>
                        }
                    </div>
                    <div>
                        <img src={settingsIcon} width={35} id="chat-sidebar" onClick={() => setOpenSettings(true)} className="mt-4" style={hideOtherIcons ? {display: "block"} : {display: "none"}}/>
                    </div>
                    <ChatResponse check={sidebarStatus} ollama={ollama} 
                    disableChat={disableChat} 
                    pageNumber={pageNumber}
                    setChats={setChats}
                    fileID={fileID}
                    stateID={stateID}
                    stateChatID={stateChatID}
                    setChatSeq={setChatSeq}
                     />
                </div>
                <div>
                    {(disableSaveButton &&
                        <>
                        <hr className="mt-5" style={hideOtherIcons ? {display: "block"} : {display: "none"}}/>
                    {( fileID && stateID && stateChatID && chats.length != 0 &&
                        <div>
                            <img onClick={() => {
                                chats.forEach((chat,index) => {
                                    InsertNewChat(
                                        chat.type,
                                        chat.text,
                                        index + chatSeq,
                                        stateChatID
                                    ).then((chat_r) => {
                                        console.log(chat_r);
                                    }).catch((e) => {
                                        showErr(e);
                                    });
                                    setShowNotify(true);
                                    setChats([]);
                                })
                            }} src={saveIcon} width={35} id="chat-sidebar" className="mt-4" style={hideOtherIcons ? {display: "block"} : {display: "none"}}/>
                        </div>
                    )}
                        <div>
                            <img onClick={() => setOpenSaveAsPanel(true)} src={saveAsIcon} width={35} id="chat-sidebar" className="mt-4" style={hideOtherIcons ? {display: "block"} : {display: "none"}}/>
                        </div>
                    </>
                    )}

                </div>
        </div>
    );
}