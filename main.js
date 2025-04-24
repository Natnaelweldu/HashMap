// importing
import { LinkedList } from "./linkedList.js";
import { HashMap } from "./hashMap.js";

// const list = new LinkedList();
// list.append({
//     key: "nati",
//     department: "software"
// });
// list.append({
//     key: "nebil",
//     department: "software"
// });
// list.append({
//     key: "bruk",
//     department: "software"
// });
// list.append({
//     key: "baki",
//     department: "software"
// });
// list.append({
//     key: "nahom",
//     department: "software"
// });

// console.log(list.contains("nahom"));

const hash = new HashMap(16);

hash.set('apple', 'red')
hash.set('apple', 'reds')
hash.set('banana', 'yellow')
hash.set('carrot', 'orange')
hash.set('dog', 'brown')
hash.set('elephant', 'gray')
hash.set('frog', 'green')
hash.set('grape', 'purple')
hash.set('hatts', 'black')
hash.set('ice cream', 'white')
hash.set('jacket', 'blue')
hash.set('appear', 'blue')
hash.set('ice crfwefeam', 'white')
hash.set('jatrnycket', 'blue')
hash.set('apergwpear', 'blue')
hash.set('cowhrtntain', 'blue')
hash.set('kite', 'pink')
hash.set('lion', 'golden')
hash.set('liosn', 'goldesn')

// console.log(hash.delete("liosn"))
console.log(hash.entries())

