class Memory {
    constructor() {
        this.storage = new Map();
    }

    set(key, value) {
        if (typeof key !== 'string') throw new Error('key must be a string');
        this.storage.set(key, value);
    }

    get(key) {
        return this.storage.get(key);
    }

    has(key) {
        return this.storage.has(key);
    }

    delete(key) {
        return this.storage.delete(key);
    }

    clear() {
        this.storage.clear();
    }

    keys() {
        return Array.from(this.storage.keys());
    }

    values() {
        return Array.from(this.storage.values());
    }
}

export default Memory;