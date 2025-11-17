import { remove, BaseDirectory } from "@tauri-apps/plugin-fs";
export default async function DeletePDFFile(path) {
    await remove(path,{
        baseDir: BaseDirectory.AppData
    }).then(() => {
        console.log("File deleted!");
    }).then((e) => {
        console.log(e)
    })

}