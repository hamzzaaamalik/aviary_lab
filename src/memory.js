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

    has(key) {
        return this.storage.has(key);
    }

    delete(key) {
        return this.storage.delete(key);
    }

    clear() {
        this.storage.clear();
    }

    snapshot() {
        return Array.from(this.storage.entries());
    }
}

export default Memory;