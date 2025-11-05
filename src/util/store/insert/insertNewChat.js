import Database from "@tauri-apps/plugin-sql"

export default async function InsertNewChat(userType,chatSeq,state_chat_id) {
    const DB = await Database.load('sqlite:state.db');
    
    DB.execute('INSERT INTO chats (user_type,chat_seq,state_chat_id) VALUES ($1, $2, &3)',
        [userType,chatSeq,state_chat_id]
    ).then(r => {
        return r;
    }).catch(e => {
        return e;
    });
}