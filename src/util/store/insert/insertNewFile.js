import Database from "@tauri-apps/plugin-sql"

export default async function InsertNewFile(name,location) {
    const DB = await Database.load('sqlite:state.db');

    return DB.execute('INSERT INTO files (name,location) VALUES ($1, $2)',
        [name,location]
    );
}