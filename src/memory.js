class Memory {
    constructor() {
        this.storage = {};
    }

    // store an item with a unique key
    store(key, value) {
        if (!key || !value) {
            throw new Error('Key and value must be provided.');
        }
        this.storage[key] = value;
    }

    // retrieve an item by its key
    retrieve(key) {
        if (!this.storage[key]) {
            return null; // or handle not found case
        }
        return this.storage[key];
    }

    // delete an item by its key
    delete(key) {
        if (this.storage[key]) {
            delete this.storage[key];
        }
    }

    // clear all stored items
    clear() {
        this.storage = {};
    }

    // get all stored keys
    getAllKeys() {
        return Object.keys(this.storage);
    }
}