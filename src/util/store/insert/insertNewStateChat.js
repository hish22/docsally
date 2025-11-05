import Database from "@tauri-apps/plugin-sql"

export default async function InsertNewStateChat(state_id) {
    const DB = await Database.load('sqlite:state.db');
    
    DB.execute('INSERT INTO state_chat (state_id) VALUES ($1)',
        [state_id]
    ).then(r => {
        return r;
    }).catch(e => {
        return e;
    });
}