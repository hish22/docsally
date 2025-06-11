import "./../App.css";
import ChatResponse from "./chatResponse";
import CurrentChats from "./currentChats";
export default function ChatSection({ollama}) {

    return (
        <div id="parts-of-chats">
              <div id="left-pane">
                <CurrentChats />
                <div id="text-chat-div">
                    <div className="flex-between">
                        <p>{ollama}</p>
                    </div>
                    <ChatResponse />
                </div>
            </div>
        </div>
    );
}