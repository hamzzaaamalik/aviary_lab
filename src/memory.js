// memory.js

class Memory {
    constructor() {
        this.data = {};
    }

    // store a value in memory
    store(key, value) {
        this.data[key] = value;
        console.log(`stored: ${key} => ${value}`);
    }

    // retrieve a value from memory
    retrieve(key) {
        if (key in this.data) {
            console.log(`retrieved: ${key} => ${this.data[key]}`);
            return this.data[key];
        } else {
            console.log(`key not found: ${key}`);
            return null;
        }
    }

    // clear memory
    clear() {
        this.data = {};
        console.log('memory cleared');
    }

    // randomize memory for fun
    chaos() {
        const keys = Object.keys(this.data);
        if (keys.length === 0) return;
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        console.log(`chaos activated! removing: ${randomKey}`);
        delete this.data[randomKey];
    }
}

// exporting the Memory class for use
module.exports = Memory;