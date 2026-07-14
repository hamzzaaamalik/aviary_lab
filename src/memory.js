class Memory {
    constructor() {
        this.store = {};
    }

    set(key, value) {
        this.store[key] = value;
    }

    get(key) {
        return this.store[key] || null;
    }

    has(key) {
        return key in this.store;
    }

    delete(key) {
        if (this.has(key)) {
            delete this.store[key];
        }
    }

    clear() {
        this.store = {};
    }
}

const memory = new Memory();

export default memory;