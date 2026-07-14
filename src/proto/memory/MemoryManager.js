/**
 * MemoryManager handles memory operations, including storage and retrieval of knowledge.
 * It abstracts the interaction with LongTermMemory and ensures data integrity.
 *
 * @module MemoryManager
 */

import LongTermMemory from './LongTermMemory';

class MemoryManager {
    constructor() {
        this.memory = new LongTermMemory();
    }

    /**
     * Stores a knowledge item in memory.
     * @param {string} key - The unique key for the knowledge.
     * @param {*} value - The knowledge item to store.
     * @throws {Error} If the key is invalid or the value is undefined.
     */
    store(key, value) {
        if (!key || value === undefined) {
            throw new Error('Invalid key or value.');
        }
        this.memory.store(key, value);
    }

    /**
     * Retrieves a knowledge item from memory.
     * @param {string} key - The unique key for the knowledge.
     * @returns {*} The knowledge item or null if not found.
     */
    retrieve(key) {
        return this.memory.retrieve(key);
    }

    /**
     * Deletes a knowledge item from memory.
     * @param {string} key - The unique key for the knowledge.
     * @throws {Error} If the key is invalid.
     */
    delete(key) {
        if (!key) {
            throw new Error('Invalid key.');
        }
        this.memory.delete(key);
    }

    /**
     * Clears all knowledge from memory.
     */
    clear() {
        this.memory.clear();
    }
}

export default MemoryManager;