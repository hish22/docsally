import InsertNewFile from "../store/insert/insertNewFile";

export default function createNewSave(info) {
    InsertNewFile(info.name,info.location);
}