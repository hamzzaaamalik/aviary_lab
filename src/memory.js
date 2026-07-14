class Memory {
    constructor() {
        this.storage = {};
    }

    set(key, value) {
        this.storage[key] = value;
    }

    get(key) {
        return this.storage[key];
    }

    has(key) {
        return key in this.storage;
    }

    delete(key) {
        if (this.has(key)) {
            delete this.storage[key];
        }
    }

    clear() {
        this.storage = {};
    }
}

module.exports = Memory;
