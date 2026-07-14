class MemoryStore {
    constructor() {
        this.store = {};
    }

    set(key, value) {
        if (key in this.store) {
            throw new Error(`Key \\${key} already exists.`);
        }
        this.store[key] = value;
    }

    get(key) {
        if (!(key in this.store)) {
            throw new Error(`Key \\${key} does not exist.`);
        }
        return this.store[key];
    }

    remove(key) {
        if (!(key in this.store)) {
            throw new Error(`Cannot remove non-existing key: \\${key}.`);
        }
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }

    has(key) {
        return key in this.store;
    }
}

export default MemoryStore;