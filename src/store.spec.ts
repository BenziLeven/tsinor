import { expect } from "chai";
import { Store, UninitializedStoreError } from "./store";
import mock from "mock-fs"
import { fileExists } from "./jsonHelper";

type Person = {
    name: {first: string, last: string},
    age: number
}

describe("Store", () => {
    beforeEach(() => {
        mock({
            "./data": {
                "existing_file.json": `{"data":[\n{ "_id": 1, "entry": { "a": 1, "b": 2 } }\n]}`
            }
        });
    });

    it("should create an empty store", () => {
        const store = new Store<Person>();

        expect(store.list()).to.deep.equal([]);
    });


    describe("#init", () => {
        it("should initiate the store by creating a storage json file when there isn't one already", () => {
            const store = new Store<Person>();
    
            store.init('people.json');
    
            expect(fileExists('./data/people.json')).to.be.true;
        });
        it("should initiate the store with the data contained in the file", () => {
            const store = new Store<{a: number; b:number}>();

            store.init("existing_file.json");

            expect(store.list()).to.deep.equal([{a: 1, b: 2}])
        });
        it("should initialize _id of the store to be higher than all existing elements", () => {
            const store = new Store<{a: number; b:number}>();

            store.init("existing_file.json");

            expect(store["_id"]).to.equal(2)
        })
    });

    describe("#add", () => {
        it("should throw if store hasn't been initialized", () => {
            const john: Person = { 
                name: { first: "John", last: "Doe" },
                age: 30
            };
            const store = new Store<Person>();
            const functionCall = () => { store.add(john); };

            expect(functionCall).to.throw(UninitializedStoreError);

        });
        it("should add an entry", () => {
            const john: Person = { 
                name: { first: "John", last: "Doe" },
                age: 30
            };
            
            const store = new Store<Person>();
            store.init("people.json")
            store.add(john)
    
            expect(store.list()).to.deep.equal([john])    
        });
    })
    
    describe("#addMulti", () => {
        it("should throw if store hasn't been initialized", () => {
            const john: Person = { 
                name: { first: "John", last: "Doe" },
                age: 30
            };
            const jane: Person = { 
                name: { first: "Jane", last: "Doe" },
                age: 32
            };
            
            const store = new Store<Person>();
            const functionCall = () => { store.addMulti([john, jane]) };

            expect(functionCall).to.throw(UninitializedStoreError);

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
            store.init("people.json");
            store.addMulti([john, jane]);

            expect(store.list()).to.have.deep.members([john, jane]);
        });

    })
    
    describe("#remove", () => {
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
            store.init("people.json")
            store.addMulti([john, jane]);
    
            store.remove(1);
    
            expect(store.list()).to.deep.equal([jane]);
        });
    })

    describe("#removeMulti", () => {
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
            store.init("people.json")
            store.addMulti([john, jane]);

            store.removeMulti([1, 2]);

            expect(store.list()).to.not.deep.include(jane);
            expect(store.list()).to.not.deep.include(john);
            expect(store.list()).to.deep.equal([]);
        });
    });

    describe("#get", () => {
        it("should return the element at that index", () => {
            const john: Person = { 
                name: { first: "John", last: "Doe" },
                age: 30
            };
            const jane: Person = { 
                name: { first: "Jane", last: "Doe" },
                age: 32
            };
            const store = new Store<Person>();
            store.init("people.json")
            store.addMulti([john, jane]);

            const result = store.get(2);

            expect(result).to.deep.equal(jane);
        });

        it("should return undefined if no element math the provided id", () => {
            const john: Person = { 
                name: { first: "John", last: "Doe" },
                age: 30
            };
            const jane: Person = { 
                name: { first: "Jane", last: "Doe" },
                age: 32
            };
            const store = new Store<Person>();
            store.init("people.json")
            store.addMulti([john, jane]);

            const result = store.get(4);

            expect(result).to.be.undefined;
        })
    })

    afterEach(() => {
        mock.restore
    })
});