class Memory {
    constructor() {
        this.entries = new Map();
    }

    add(key, value) {
        this.entries.set(key, value);
    }

    get(key) {
        return this.entries.get(key);
    }

    delete(key) {
        this.entries.delete(key);
    }

    has(key) {
        return this.entries.has(key);
    }

    clear() {
        this.entries.clear();
    }

    logMemory() {
        console.log('Current Memory Entries:', this.entries);
    }
}

// Use the Memory class
const globalMemory = new Memory();

export { globalMemory, Memory };