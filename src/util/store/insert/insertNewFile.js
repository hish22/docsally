import Database from "@tauri-apps/plugin-sql"
import MovePDfFile from "../../movePDFfile";

export default async function InsertNewFile(name,location) {
    const Movedlocation = await MovePDfFile(location);

    const DB = await Database.load('sqlite:state.db');

    return await DB.execute('INSERT INTO files (name,location) VALUES ($1, $2)',
        [name,Movedlocation]
    );
}