import Database from "@tauri-apps/plugin-sql"

export default async function DeleteChat(state_chat_id) {
    const DB = await Database.load('sqlite:state.db');
    
    return await DB.execute('DELETE FROM chats WHERE state_chat_id = $1',
        [state_chat_id]
    );
}