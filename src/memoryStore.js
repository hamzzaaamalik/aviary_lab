class MemoryStore {
    constructor() {
        this.shortTerm = new Map();
        this.longTerm = new Map();
    }

    addShortTerm(key, value) {
        this.shortTerm.set(key, value);
    }

    getShortTerm(key) {
        return this.shortTerm.get(key);
    }

    addLongTerm(key, value) {
        this.longTerm.set(key, value);
    }

    getLongTerm(key) {
        return this.longTerm.get(key);
    }

    clearShortTerm() {
        this.shortTerm.clear();
    }

    clearLongTerm() {
        this.longTerm.clear();
    }
}

export default MemoryStore;