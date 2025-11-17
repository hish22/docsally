import Database from "@tauri-apps/plugin-sql"

export default async function DeleteFile(file_id) {
    const DB = await Database.load('sqlite:state.db');
    
    return await DB.execute('DELETE FROM files WHERE file_id = $1',
        [file_id] 
    );
}