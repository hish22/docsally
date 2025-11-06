import Database from "@tauri-apps/plugin-sql"

export default async function InsertNewChat(userType,payload,chatSeq,state_chat_id) {
    const DB = await Database.load('sqlite:state.db');
    
    return DB.execute('INSERT INTO chats (user_type,payload,chat_seq,state_chat_id) VALUES ($1, $2, $3, $4)',
        [userType,payload,chatSeq,state_chat_id]
    );
}