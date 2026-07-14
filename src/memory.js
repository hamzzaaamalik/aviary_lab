class Memory {
    constructor() {
        this.shortTerm = {};
        this.longTerm = {};
    }

    // store a memory in short-term.
    storeShortTerm(key, value) {
        this.shortTerm[key] = value;
        setTimeout(() => {
            delete this.shortTerm[key];
        }, 30000); // auto-expire after 30 seconds
    }

    // store a memory in long-term.
    storeLongTerm(key, value) {
        this.longTerm[key] = value;
    }

    // retrieve a short-term memory.
    retrieveShortTerm(key) {
        return this.shortTerm[key] || null;
    }

    // retrieve a long-term memory.
    retrieveLongTerm(key) {
        return this.longTerm[key] || null;
    }

    // clear all memories (short-term). 
    clearShortTerm() {
        this.shortTerm = {};
    }

    // clear all memories (long-term). 
    clearLongTerm() {
        this.longTerm = {};
    }

    // display all memories for debugging. 
    displayMemories() {
        console.log('Short Term:', this.shortTerm);
        console.log('Long Term:', this.longTerm);
    }
}

export default Memory;