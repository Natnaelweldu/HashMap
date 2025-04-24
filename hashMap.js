// importing linked list
import { LinkedList } from "./linkedList.js";

export class HashMap {
  constructor(capacity = 16) {
    this.loadFactor = 0;
    this.capacity = capacity;
    this.bucket = Array(capacity);
    this.counter = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  isLoadFactorExceeded() {
    this.loadFactor = this.counter / this.capacity;

    return this.loadFactor >= 0.75;
  }

  doubleCapacity() {
    this.capacity *= 2;
    const copiedBucket = [...this.bucket];
    this.bucket = Array(this.capacity);
    this.counter = 0;
    this.loadFactor = 0;

    copiedBucket.forEach((item) => {
      if (item) {
        let current = item.atHead();
        while (current != null) {
          const currentKey = current.data.key;
          const currentValue = current.data.value;
          this.set(currentKey, currentValue);

          current = current.next;
        }
      }
    });
  }

  set(key, value) {
    let index = this.hash(key);

    // check the size of the array
    if (index < 0 || index >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // check if the key exist before resizing (prevents resizing for when replacing)
    if (!this.has(key)) {
      // check if the load factor exceeded 0.75
      const loadFactorExceeded = this.isLoadFactorExceeded();
      if (loadFactorExceeded) {
        this.doubleCapacity();
        // Recalculate the index after resizing, as capacity has changed
        index = this.hash(key);
      }
    }

    // check if the bucket at that index is empty
    if (!this.bucket[index]) {
      // create a linked list for handling collisions
      const linkedList = new LinkedList();
      this.bucket[index] = linkedList;
      this.counter++;
    }

    // check if the element is in the linked list
    if (!this.bucket[index].contains(key)) {
      this.bucket[index].append({ key, value });
    } else {
      this.bucket[index].replace(key, value);
    }
  }

  get(key) {
    const index = this.hash(key);

    // check if the array at that index is null
    if (!this.bucket[index]) return null;

    // iterate through the linked list and match the key
    let temp = this.bucket[index].atHead();
    while (temp !== null) {
      if (temp.data.key == key) {
        return temp.data.value;
      }

      temp = temp.next;
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);

    // check if the array is empty at that index
    if (!this.bucket[index]) return false;

    // if array not empty check if the key exist
    return this.bucket[index].contains(key);
  }

  delete(key) {
    const index = this.hash(key);

    // check if array is empty
    if (!this.bucket[index]) return false;

    // if the index is present
    const nodeIndex = this.bucket[index].find(key);

    // return null if the element doesnt exist
    if (!nodeIndex) return false;

    this.bucket[index].removeAt(nodeIndex);
    return true;
  }

  length() {
    return this.counter;
  }

  clear() {
    this.capacity = 16;
    this.bucket = Array(this.capacity);
    this.counter = 0;
    this.loadFactor = 0;
  }

  keys() {
    const keys = [];

    this.bucket.forEach((item) => {
      let temp = item.atHead();

      while (temp != null) {
        keys.push(temp.data.key);

        temp = temp.next;
      }
    });

    return keys;
  }

  values() {
    const values = [];

    this.bucket.forEach((item) => {
      let temp = item.atHead();

      while (temp != null) {
        values.push(temp.data.value);

        temp = temp.next;
      }
    });

    return values;
  }

  entries() {
    const entries = [];

    this.bucket.forEach((item) => {
      let temp = item.atHead();

      while (temp != null) {
        entries.push([temp.data.key, temp.data.value]);

        temp = temp.next;
      }
    });

    return entries;
  }
}
