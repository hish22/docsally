import Database from "@tauri-apps/plugin-sql"

export default async function DeleteState(file_id) {
    const DB = await Database.load('sqlite:state.db');
    
    return await DB.execute('DELETE FROM states WHERE file_id = $1',
        [file_id]
    );
}