import { log } from "console";
import { fileExists, parseJsonFile, createNewEmptyJsonFile } from "./jsonHelper";
const JSON_STORAGE_DIR_PATH = "../data/"


export type WithId<T> = { _id: number, entry: T };

export class Store<T> {
    private _entries: WithId<T>[];
    private _id: number;
    private _jsonFileName: string;

    constructor() {
        this._entries = [];
        this._id = 1;
        this._jsonFileName = "";
    }

    init(jsonFileName: string) {
        this._jsonFileName = jsonFileName;
        const filePath = `${JSON_STORAGE_DIR_PATH}${this._jsonFileName}`

        if (fileExists(filePath)) {
            const fileData = parseJsonFile<T>(filePath);
            this._entries = fileData;
        } else {
            createNewEmptyJsonFile(filePath)
        }
    }

    add(entry: T) {
        if (! this._jsonFileName) {
            throw new UninitializedStoreError();
        }

        this._entries.push({_id: this._id, entry});
        this._id ++;
    }

    addMulti(entries: T[]) {
        entries.forEach(entry => this.add(entry));
    } 

    remove(id: number) {
        if (! this._jsonFileName) {
            throw new UninitializedStoreError();
        }

        const entryIndex = this._entries.findIndex(element => element._id === id);
        if(entryIndex === -1) {
            console.error(`_id: ${id} doesn't exist`);
        }

        this._entries.splice(entryIndex, 1);
    }

    removeMulti(ids: number[]) {
        ids.forEach(id => this.remove(id));
    }

    list(): T[] {
        return this._entries.map(({entry}) => entry)
    }
}

export class UninitializedStoreError extends Error {
    constructor() {
        super("this method must be called after initializing the store with store.init()")
        this.name = "UninitializedStoreError";
    }
}