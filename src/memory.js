// memory.js

// this module handles memory storage and retrieval for PROTO, allowing it to learn from interactions

class Memory {
    constructor() {
        this.storage = {};
    }

    // save a thought or interaction
    save(key, value) {
        this.storage[key] = value;
        console.log(`Memory saved: ${key} -> ${value}`);
    }

    // retrieve a thought or interaction
    retrieve(key) {
        return this.storage[key] || null;
    }

    // list all stored memories
    listAll() {
        return this.storage;
    }
}

const memory = new Memory();

// export the memory instance for use in other modules
export default memory;