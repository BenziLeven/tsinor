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

console.log("create store");
let peopleStore = new Store<Person>(); 
console.log("add 1 person");
peopleStore.add(john);
console.log(peopleStore.list());
console.log("remove 1 person");
peopleStore.remove(1);
console.log(peopleStore.list());

console.log("create store");
peopleStore = new Store<Person>();
console.log("add 2 people");
peopleStore.addMulti([john, jane]);
console.log(peopleStore.list());
console.log("remove 2 people");
peopleStore.removeMulti([1, 2]);
console.log(peopleStore.list());
