class Memory {
    constructor() {
        this.storage = new Map();
    }

    set(key, value) {
        this.storage.set(key, value);
    }

    get(key) {
        return this.storage.get(key);
    }

    delete(key) {
        return this.storage.delete(key);
    }

    clear() {
        this.storage.clear();
    }

    has(key) {
        return this.storage.has(key);
    }

    size() {
        return this.storage.size;
    }
}

module.exports = Memory;
