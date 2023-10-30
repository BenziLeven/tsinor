import * as fs from "fs";
import type { WithId } from "./store";

export function parseJsonFile<T>(jsonFilePath: string) {
    try {
        const fileData = fs.readFileSync(jsonFilePath, )
        return JSON.parse(fileData.toString()).data as unknown as WithId<T>[];
    } catch (e) {
        throw new Error(`Error: Unable to parse file:\n${e}`)
    }
}


export function fileExists(filePath: string) {
    return fs.existsSync(filePath);
}


export function createNewEmptyJsonFile(jsonFilePath: string) {
    const file = fs.openSync(jsonFilePath, "w");
    fs.writeFileSync(jsonFilePath, `{"data": [\n]}`);
}

export function updateFile<T extends object>(jsonFilePath: string, newFileData: WithId<T>[]) {
    const firstLine = `{"data": [`;
    const lastLine = `]}`;
    const dataLines = newFileData.map((element) => JSON.stringify(element)).join(",\n");
    
    const newFileContent = [firstLine, dataLines, lastLine].join("\n");
    fs.writeFileSync(jsonFilePath, newFileContent)
}
