export class HashMap {
  constructor(capacity) {
    this.loadFactor = 0;
    this.capacity = capacity;
    this.bucket = [];
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


}


const hash = new HashMap(16);
console.log(hash.hash("nati"));
