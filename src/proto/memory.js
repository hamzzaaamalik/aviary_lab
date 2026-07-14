/**
 * @module memory
 * @description Module for handling memory management and retrieval within the PROTO architecture.
 */

class MemoryManager {
    constructor() {
        this.memoryStore = {};
    }

    /**
     * Adds an item to the memory store.
     * @param {string} key - The key under which the value will be stored.
     * @param {*} value - The value to be stored in memory.
     */
    addMemory(key, value) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        this.memoryStore[key] = value;
    }

    /**
     * Retrieves an item from the memory store.
     * @param {string} key - The key of the value to retrieve.
     * @returns {*} The value associated with the key, or undefined if the key does not exist.
     */
    getMemory(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        return this.memoryStore[key];
    }

    /**
     * Deletes an item from the memory store.
     * @param {string} key - The key of the value to delete.
     */
    deleteMemory(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string.');
        }
        delete this.memoryStore[key];
    }

    /**
     * Clears all items from the memory store.
     */
    clearMemory() {
        this.memoryStore = {};
    }

    /**
     * Retrieves all keys in the memory store.
     * @returns {string[]} An array of keys in the memory store.
     */
    getAllKeys() {
        return Object.keys(this.memoryStore);
    }
}

// Exporting the MemoryManager class for use in other modules.
module.exports = MemoryManager;