import "./../App.css";

export default function ChatResponse() {
    return (
    <>
        <div className="chat-container">
            <div className="chat-box left">Hello! How are you?</div>
            <div className="chat-box right">I'm good, thanks! How about you?</div>
            <div className="chat-box left">Doing well! Working on a project.</div>
            <div className="chat-box right">Nice! Tell me more about it.</div>
        </div>

        <form className="center" id="chatForm">
            <textarea placeholder="Chat..." name="chatInput"></textarea>
        </form>
    </>
    )
}