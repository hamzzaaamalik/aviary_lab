class Memory {
    constructor() {
        this.storage = {};
    }
    
    // store a value with a key
    set(key, value) {
        this.storage[key] = value;
    }
    
    // retrieve a value by key
    get(key) {
        return this.storage[key];
    }
    
    // check if a key exists
    has(key) {
        return key in this.storage;
    }
    
    // remove a key
    delete(key) {
        if (this.has(key)) {
            delete this.storage[key];
        }
    }
    
    // clear all memory
    clear() {
        this.storage = {};
    }
}

export default Memory;