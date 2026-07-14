/**
 * @module proto/memory
 *
 * This module manages memory operations for PROTO, allowing for storing and retrieving data efficiently.
 * It extends basic memory management with structured data storage.
 */

class MemoryManager {
    constructor() {
        this.store = new Map();
    }

    /**
     * Stores a value in memory under the given key.
     * @param {string} key - The key under which the value will be stored.
     * @param {any} value - The value to store.
     * @throws {Error} If key is not a string.
     */
    set(key, value) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        this.store.set(key, value);
    }

    /**
     * Retrieves a value from memory by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {any} The stored value, or undefined if not found.
     * @throws {Error} If key is not a string.
     */
    get(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        return this.store.get(key);
    }

    /**
     * Checks if a key exists in memory.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false otherwise.
     * @throws {Error} If key is not a string.
     */
    has(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        return this.store.has(key);
    }

    /**
     * Deletes a value from memory by key.
     * @param {string} key - The key of the value to delete.
     * @returns {boolean} True if the key was found and deleted, false otherwise.
     * @throws {Error} If key is not a string.
     */
    delete(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        return this.store.delete(key);
    }
}

const memoryManager = new MemoryManager();
export default memoryManager;