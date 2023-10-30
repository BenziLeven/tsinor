import { log } from "console";
import { fileExists, parseJsonFile, createNewEmptyJsonFile, updateFile } from "./jsonHelper";
const JSON_STORAGE_DIR_PATH = "./data/"


export type WithId<T> = { _id: number, entry: T };

export class Store<T extends object> {
    private _entries: WithId<T>[];
    private _id: number;
    private _jsonFilePath: string;

    constructor() {
        this._entries = [];
        this._id = 1;
        this._jsonFilePath = "";
    }

    init(jsonFileName: string) {
        this._jsonFilePath = `${JSON_STORAGE_DIR_PATH}${jsonFileName}`

        if (fileExists(this._jsonFilePath)) {
            const fileData = parseJsonFile<T>(this._jsonFilePath);
            this._entries = fileData;
        } else {
            createNewEmptyJsonFile(this._jsonFilePath)
        }
    }

    add(entry: T, { doFileUpdate } = { doFileUpdate: true}) {
        if (! this._jsonFilePath) {
            throw new UninitializedStoreError();
        }

        this._entries.push({_id: this._id, entry});
        this._id ++;

        if(doFileUpdate){ updateFile(this._jsonFilePath, this._entries); }
    }

    addMulti(entries: T[]) {
        entries.forEach(entry => this.add(entry, {doFileUpdate: false}));
        updateFile(this._jsonFilePath, this._entries);
    } 

    remove(id: number, { doFileUpdate } = { doFileUpdate: true}) {
        if (! this._jsonFilePath) {
            throw new UninitializedStoreError();
        }

        const entryIndex = this._entries.findIndex(element => element._id === id);
        if(entryIndex === -1) {
            console.error(`_id: ${id} doesn't exist`);
        }

        this._entries.splice(entryIndex, 1);
        if(doFileUpdate){ updateFile(this._jsonFilePath, this._entries); }
    }

    removeMulti(ids: number[]) {
        ids.forEach(id => this.remove(id));
        updateFile(this._jsonFilePath, this._entries);
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