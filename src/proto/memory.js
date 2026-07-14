/**
 * @module proto/memory
 * @description Manages short-term memory for PROTO, including storage, retrieval, and updating of memory entries.
 */

class MemoryEntry {
    /**
     * @param {string} key - Identifier for the memory entry.
     * @param {any} value - The value associated with the key.
     * @param {Date} timestamp - When the entry was created/updated.
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.timestamp = new Date();
    }

    /**
     * Updates the value of the memory entry while refreshing the timestamp.
     * @param {any} newValue - The new value for the memory entry.
     */
    update(newValue) {
        this.value = newValue;
        this.timestamp = new Date();
    }
}

class Memory {
    /**
     * @constructor
     */
    constructor() {
        this.entries = new Map();
    }

    /**
     * Stores a value in memory with a unique key.
     * @param {string} key - Unique key for the memory entry.
     * @param {any} value - Value to store.
     */
    store(key, value) {
        if (!key || this.entries.has(key)) {
            throw new Error('Invalid key or entry already exists.');
        }
        this.entries.set(key, new MemoryEntry(key, value));
    }

    /**
     * Retrieves a value from memory by key.
     * @param {string} key - Unique key for the memory entry.
     * @returns {any} - The value associated with the key, or null if not found.
     */
    retrieve(key) {
        const entry = this.entries.get(key);
        return entry ? entry.value : null;
    }

    /**
     * Updates an existing memory entry.
     * @param {string} key - Unique key for the memory entry.
     * @param {any} newValue - The new value to store.
     */
    update(key, newValue) {
        const entry = this.entries.get(key);
        if (!entry) {
            throw new Error('Entry not found.');
        }
        entry.update(newValue);
    }

    /**
     * Deletes a memory entry by key.
     * @param {string} key - Unique key for the memory entry.
     */
    delete(key) {
        if (!this.entries.has(key)) {
            throw new Error('Entry not found.');
        }
        this.entries.delete(key);
    }
}

module.exports = Memory;