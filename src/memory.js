class Memory {
    constructor() {
        this.storage = {};
    }

    set(key, value) {
        this.storage[key] = value;
    }

    get(key) {
        return this.storage[key] || null;
    }

    remove(key) {
        delete this.storage[key];
    }

    clear() {
        this.storage = {};
    }

    keys() {
        return Object.keys(this.storage);
    }
}

const memory = new Memory();

// Exporting the memory instance for use in other modules.
export default memory;