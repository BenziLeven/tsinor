import { Store } from "./store";

type Person = {
    name: {first: string, last: string},
    age: number
}

const john: Person = { 
    name: { first: "John", last: "Doe" },
    age: 30
}

const jane: Person = { 
    name: { first: "Jane", last: "Doe" },
    age: 32
}

const peter: Person = { 
    name: { first: "Peter", last: "Jackson" },
    age: 32
}

console.log("create store");
let peopleStore = new Store<Person>(); 
peopleStore.init("people.json");
console.log(peopleStore.list());

console.log("add 1 person");
peopleStore.add(john);
console.log(peopleStore.list());

console.log("add 2 people");
peopleStore.addMulti([jane, peter]);
console.log(peopleStore.list());

console.log("get 1 person");
const aPerson = peopleStore.get(1);
console.log("aPerson.name.first: ", aPerson.name.first);
console.log("aPerson.name.last: ", aPerson.name.last);
console.log("aPerson.age: ", aPerson.age);

console.log("remove 1 person");
peopleStore.remove(1);
console.log(peopleStore.list());

console.log("remove 2 people");
peopleStore.removeMulti([2, 3]);
console.log(peopleStore.list());

