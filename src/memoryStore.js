/**
 * MemoryStore - A class to handle in-memory storage for PROTO.
 * Efficiently manages data with strong typing and error handling.
 *
 * @class MemoryStore
 */
class MemoryStore {
    constructor() {
        /**
         * @type {Map<string, any>}
         * @private
         */
        this.store = new Map();
    }

    /**
     * Sets a value in the store.
     * @param {string} key - The key to store the value under.
     * @param {any} value - The value to store.
     * @throws {Error} If the key is not a string.
     */
    set(key, value) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        this.store.set(key, value);
    }

    /**
     * Retrieves a value from the store.
     * @param {string} key - The key of the value to retrieve.
     * @returns {any} The value stored under the specified key.
     * @throws {Error} If the key is not found.
     */
    get(key) {
        if (!this.store.has(key)) {
            throw new Error('Key not found.');
        }
        return this.store.get(key);
    }

    /**
     * Deletes a value from the store.
     * @param {string} key - The key of the value to delete.
     * @returns {boolean} True if the key was found and deleted, false otherwise.
     */
    delete(key) {
        return this.store.delete(key);
    }

    /**
     * Clears all data from the store.
     */
    clear() {
        this.store.clear();
    }

    /**
     * Gets the current size of the store.
     * @returns {number} The number of entries in the store.
     */
    size() {
        return this.store.size;
    }
}

module.exports = MemoryStore;
