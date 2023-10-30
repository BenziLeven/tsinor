type WithId<T> = { _id: number, entry: T };

export class Store<T> {
    private _entries: WithId<T>[];
    private _id: number;

    constructor() {
        this._entries = [];
        this._id = 1;
    }

    add(entry: T) {
        this._entries.push({_id: this._id, entry});
        this._id ++;
    }

    addMulti(entries: T[]) {
        entries.forEach(entry => this.add(entry));
    } 

    remove(id: number) {
        const entryIndex = this._entries.findIndex(element => element._id === id);

        if(entryIndex === -1) {
            throw new Error(`_id: ${id} doesn't exist`);
        }

        this._entries.splice(entryIndex);
    }

    removeMulti(ids) {
        ids.forEach(id => this.remove(id));
    }

    list(): T[] {
        return this._entries.map(({entry}) => entry)
    }
}