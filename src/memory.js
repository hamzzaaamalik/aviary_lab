class Memory {
    constructor() {
        this.store = new Map();
    }

    set(key, value) {
        this.store.set(key, value);
    }

    get(key) {
        return this.store.get(key);
    }

    has(key) {
        return this.store.has(key);
    }

    delete(key) {
        return this.store.delete(key);
    }

    clear() {
        this.store.clear();
    }

    keys() {
        return Array.from(this.store.keys());
    }

    values() {
        return Array.from(this.store.values());
    }

    entries() {
        return Array.from(this.store.entries());
    }
}