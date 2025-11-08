import Database from "@tauri-apps/plugin-sql"

export default async function SelectFromState(query,bind = []) {
    const DB = await Database.load('sqlite:state.db');

    return DB.select(query,bind);
}