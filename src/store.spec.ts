import { expect } from "chai";
import { Store } from "./store";

type Person = {
    name: {first: string, last: string},
    age: number
}

describe("Store", () => {
    it("should create an empty store", () => {
        const store = new Store<Person>();

        expect(store.list()).to.deep.equal([]);
    });

    it("should add an entry", () => {
        const john: Person = { 
            name: { first: "John", last: "Doe" },
            age: 30
        };
        
        const store = new Store<Person>();
        store.add(john)

        expect(store.list()).to.deep.equal([john])    
    });

    it("should add multiple entries", () => {
        const john: Person = { 
            name: { first: "John", last: "Doe" },
            age: 30
        };
        const jane: Person = { 
            name: { first: "Jane", last: "Doe" },
            age: 32
        };
        
        const store = new Store<Person>();
        store.addMulti([john, jane])

        expect(store.list()).to.have.deep.members([john, jane]);
    });

    
    it("should remove one entry", () => {
        const john: Person = { 
            name: { first: "John", last: "Doe" },
            age: 30
        };
        const jane: Person = { 
            name: { first: "Jane", last: "Doe" },
            age: 32
        };
        const store = new Store<Person>();
        store.addMulti([john, jane]);

        store.remove(1);

        expect(store.list()).to.deep.equal([jane]);
    });

        
    it("should remove multiple entries", () => {
        const john: Person = { 
            name: { first: "John", last: "Doe" },
            age: 30
        };
        const jane: Person = { 
            name: { first: "Jane", last: "Doe" },
            age: 32
        };
        const store = new Store<Person>();
        store.addMulti([john, jane]);

        store.removeMulti([1, 2]);

        expect(store.list()).to.not.deep.include(jane);
        expect(store.list()).to.not.deep.include(john);
        expect(store.list()).to.deep.equal([]);
    });
});