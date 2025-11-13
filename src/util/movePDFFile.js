import { copyFile, BaseDirectory, exists, mkdir } from "@tauri-apps/plugin-fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import ReplaceSlash from "./slashReplace";
export default async function MovePDfFile(path) {
    // Replace (\\ to /) for unique slash type
    let sp = ReplaceSlash(path);

    const appData = await appDataDir();
    const desPath = await join(appData,"pdf",sp[sp.length - 1])

    // Check if pdf dir exists
    const pdfExists = await exists('pdf', {
        baseDir: BaseDirectory.AppData
    });

    if (!pdfExists) {
        await mkdir('pdf', {
            baseDir: BaseDirectory.AppData
        });
    }

    const pdfFilePath = await join("pdf",sp[sp.length - 1]);

    const pdfFileExist = await exists(pdfFilePath,{
        baseDir: BaseDirectory.AppData
    })

    if (!pdfFileExist) {
        // move pdf file to pdf dir
        const pdfFile = await copyFile(path,desPath)
        .then((f) => {
            console.log("File moved!");
        }).catch((e) => {
            console.log(e);
        })
    }

    return pdfFilePath;
}