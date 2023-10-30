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
