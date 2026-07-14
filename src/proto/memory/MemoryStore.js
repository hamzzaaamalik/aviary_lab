/**
 * MemoryStore - A class for managing short-term and long-term memory storage.
 *
 * This class provides an interface for adding, recalling, and managing
 * both short-term and long-term memories, ensuring that memory
 * persistence and retrieval are handled efficiently.
 *
 * @class
 */
class MemoryStore {
    constructor() {
        /**
         * @type {Map<string, string>}
         * @private
         */
        this.shortTermMemory = new Map();

        /**
         * @type {Map<string, string>}
         * @private
         */
        this.longTermMemory = new Map();
    }

    /**
     * Add a memory to short-term storage.
     * @param {string} key - The identifier for the memory.
     * @param {string} value - The memory content.
     */
    addShortTermMemory(key, value) {
        this.shortTermMemory.set(key, value);
    }

    /**
     * Recall a memory from short-term storage.
     * @param {string} key - The identifier for the memory.
     * @returns {string | undefined} - The memory content or undefined if not found.
     */
    recallShortTermMemory(key) {
        return this.shortTermMemory.get(key);
    }

    /**
     * Transfer a memory from short-term to long-term storage.
     * @param {string} key - The identifier for the memory.
     */
    transferToLongTerm(key) {
        const value = this.recallShortTermMemory(key);
        if (value !== undefined) {
            this.longTermMemory.set(key, value);
            this.shortTermMemory.delete(key);
        }
    }

    /**
     * Add a memory to long-term storage.
     * @param {string} key - The identifier for the memory.
     * @param {string} value - The memory content.
     */
    addLongTermMemory(key, value) {
        this.longTermMemory.set(key, value);
    }

    /**
     * Recall a memory from long-term storage.
     * @param {string} key - The identifier for the memory.
     * @returns {string | undefined} - The memory content or undefined if not found.
     */
    recallLongTermMemory(key) {
        return this.longTermMemory.get(key);
    }

    /**
     * Clear all short-term memories.
     */
    clearShortTermMemory() {
        this.shortTermMemory.clear();
    }

    /**
     * Clear all long-term memories.
     */
    clearLongTermMemory() {
        this.longTermMemory.clear();
    }
}

module.exports = MemoryStore;