/**
 * LongTermMemory class to manage long-term memory storage and retrieval.
 * Stores and retrieves data persistently and efficiently.
 */
class LongTermMemory {
    constructor() {
        this.store = new Map(); // key-value store for persistent data
    }

    /**
     * Adds an item to long-term memory.
     * @param {string} key - The key for the memory item.
     * @param {any} value - The value to be stored.
     * @throws {Error} - Throws error if key is empty.
     */
    add(key, value) {
        if (!key) {
            throw new Error('Key cannot be empty.');
        }
        this.store.set(key, value);
    }

    /**
     * Retrieves an item from long-term memory by key.
     * @param {string} key - The key for the memory item.
     * @returns {any} - The value associated with the key, or undefined if not found.
     */
    get(key) {
        return this.store.get(key);
    }

    /**
     * Checks if a key exists in long-term memory.
     * @param {string} key - The key to check.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    has(key) {
        return this.store.has(key);
    }

    /**
     * Removes an item from long-term memory by key.
     * @param {string} key - The key for the memory item.
     * @throws {Error} - Throws error if key is empty.
     */
    remove(key) {
        if (!key) {
            throw new Error('Key cannot be empty.');
        }
        this.store.delete(key);
    }

    /**
     * Clears all items from long-term memory.
     */
    clear() {
        this.store.clear();
    }
}

module.exports = LongTermMemory;
