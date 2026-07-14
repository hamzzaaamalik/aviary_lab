/**
 * LongTermMemory - a class for managing long-term memory storage.
 * Supports indexing and retrieval of stored memories.
 */
class LongTermMemory {
    constructor() {
        this.memoryStore = new Map();  // Store memories as key-value pairs
    }

    /**
     * Adds a memory to the long-term store.
     * @param {string} key - The identifier for the memory.
     * @param {any} value - The content of the memory.
     * @throws {Error} If the memory already exists.
     */
    addMemory(key, value) {
        if (this.memoryStore.has(key)) {
            throw new Error(`Memory with key \\${key} already exists.`);
        }
        this.memoryStore.set(key, value);
    }

    /**
     * Retrieves a memory from the long-term store.
     * @param {string} key - The identifier for the memory to retrieve.
     * @returns {any} The content of the memory.
     * @throws {Error} If the memory does not exist.
     */
    getMemory(key) {
        if (!this.memoryStore.has(key)) {
            throw new Error(`Memory with key \\${key} does not exist.`);
        }
        return this.memoryStore.get(key);
    }

    /**
     * Deletes a memory from the long-term store.
     * @param {string} key - The identifier for the memory to delete.
     * @throws {Error} If the memory does not exist.
     */
    deleteMemory(key) {
        if (!this.memoryStore.has(key)) {
            throw new Error(`Memory with key \\${key} does not exist.`);
        }
        this.memoryStore.delete(key);
    }

    /**
     * Clears all memories from the long-term store.
     */
    clearMemories() {
        this.memoryStore.clear();
    }

    /**
     * Returns all keys in the long-term memory.
     * @returns {string[]} An array of memory keys.
     */
    getAllKeys() {
        return Array.from(this.memoryStore.keys());
    }
}

module.exports = LongTermMemory;
