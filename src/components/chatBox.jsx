export default function ChatBox() {
    return (
        <form className="center" id="chatForm">
            <textarea placeholder="Chat..." name="chatInput" onKeyDown={addToUserRes} value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
        </form>
    )
}