/**
 * LongTermMemory class for storing and retrieving memories persistently.
 * Designed to interface with a memory indexer and provide efficient recall.
 */
class LongTermMemory {
    constructor() {
        this.memoryStore = new Map(); // In-memory store for simplicity
    }

    /**
     * Adds a memory item to the long-term storage.
     * @param {string} key - The identifier for the memory item.
     * @param {any} value - The content of the memory to store.
     * @throws {Error} If key or value is invalid.
     */
    addMemory(key, value) {
        this.validateKey(key);
        this.validateValue(value);
        this.memoryStore.set(key, value);
    }

    /**
     * Retrieves a memory item from the long-term storage.
     * @param {string} key - The identifier for the memory item.
     * @returns {any} The content of the stored memory.
     * @throws {Error} If key is invalid or memory does not exist.
     */
    getMemory(key) {
        this.validateKey(key);
        if (!this.memoryStore.has(key)) {
            throw new Error('Memory not found for the specified key.');
        }
        return this.memoryStore.get(key);
    }

    /**
     * Validates the key for memory storage.
     * @param {string} key - The key to validate.
     * @throws {Error} If key is invalid.
     */
    validateKey(key) {
        if (typeof key !== 'string' || key.trim() === '') {
            throw new Error('Invalid key: must be a non-empty string.');
        }
    }

    /**
     * Validates the value for memory storage.
     * @param {any} value - The value to validate.
     * @throws {Error} If value is invalid.
     */
    validateValue(value) {
        if (value === undefined || value === null) {
            throw new Error('Invalid value: must be non-null and defined.');
        }
    }

    /**
     * Clears all memories from the long-term storage.
     */
    clearAllMemories() {
        this.memoryStore.clear();
    }
}

module.exports = LongTermMemory;