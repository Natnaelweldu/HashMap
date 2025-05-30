// importing Node class
import { Node } from "./node.js";

export class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  append(data) {
    this.count++;
    const newNode = new Node(data);
    if (!this.head) {
      // for first element insertion
      this.head = newNode;
      return;
    }

    let temp = this.head;
    while (temp.next != null) temp = temp.next;

    temp.next = newNode;
  }

  prepend(data) {
    this.count++;
    const newNode = new Node(data);
    let temp = this.head;

    this.head = newNode;
    this.head.next = temp;
  }

  size() {
    return this.count;
  }

  atHead() {
    return this.head;
  }

  tail() {
    let temp = this.head;
    while (temp.next != null) temp = temp.next;

    return temp;
  }

  at(index) {
    // check if the index is valid
    const size = this.size();
    if (index > size || index < 0) {
      throw new RangeError("Index is out of bounds for the list.");
    }

    let temp = this.head;
    while (index > 0) {
      temp = temp.next;
      index--;
    }

    return temp;
  }

  pop() {
    // check if list is empty
    if (!this.head) throw new Error("Can not remove an empty list.");

    // check if list has only one element
    if (!this.head.next === null) this.head = null;

    let temp = this.head;
    while (temp.next.next != null) temp = temp.next;

    temp.next = null;

    // Decrement the count
    this.count--;
  }

  contains(key) {
    let temp = this.head;
    while (temp != null) {
      if (temp.data.key == key) return true;
      temp = temp.next;
    }
    return false;
  }

  find(key) {
    let index = 0;
    let temp = this.head;

    while (temp !== null) {
      if (temp.data.key == key) {
        return index;
      }
      index++;
      temp = temp.next;
    }
    return null;
  }

  toString() {
    let listString = "";
    let temp = this.head;

    while (temp != null) {
      let string = `(${temp.value}) -> `;
      listString += string;
      temp = temp.next;
    }

    listString += "null";

    return listString;
  }

  insertAt(data, index) {
    // check if the index is valid
    const size = this.size();
    if (index > size || index < 0) {
      throw new RangeError("Index is out of bounds for the list.");
    }

    const newNode = new Node(data);

    // Case 1: Insert at the start
    if (index == 0) {
      this.prepend(data);
      return;
    }

    // Case 2: Insert at the end
    if (!this.head) {
      this.append(data);
      return;
    }

    // Case 3: Insert at the middle
    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    newNode.next = current;
    previous.next = newNode;

    // increment the count
    this.count++;
  }

  removeAt(index) {
    // Checking if index is valid
    const size = this.size();
    if (index > size - 1 || index < 0) {
      throw new RangeError("Index is out of bounds for the list.");
    }

    // Decrement the count
    this.count--;

    // Case 1: Remove at the start
    if (index === 0) {
      if (this.head) {
        this.head = this.head.next;
      }
      return;
    }

    // Case 2: Remove at the middle and end
    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    previous.next = current.next;
  }

  //replace the value for the exisiting key
  replace(keyToReplace, newValue) {
    let temp = this.head;
    // console.log(temp);

    while (temp != null) {
      if (temp.data && temp.data.key === keyToReplace) {
        temp.data.value = newValue;
        return true; 
      }
      temp = temp.next;
    }
    return false;
  }
}
