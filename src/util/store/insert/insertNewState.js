import Database from "@tauri-apps/plugin-sql"

export default async function InsertNewState(file_id,model_name) {
    const DB = await Database.load('sqlite:state.db');
    
    DB.execute('INSERT INTO states (file_id,model_name) VALUES ($1, $2)',
        [file_id,model_name]
    ).then(r => {
        return r;
    }).catch(e => {
        return e;
    });
}