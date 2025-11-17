import Database from "@tauri-apps/plugin-sql"

export default async function DeleteStateChat(state_id) {
    const DB = await Database.load('sqlite:state.db');
    
    return await DB.execute('DELETE FROM state_chat WHERE state_id = $1',
        [state_id]
    );
}