/**
 * MemoryManager handles the organization and management of memory storage,
 * allowing efficient retrieval and storage of memories.
 *
 * @class
 */
class MemoryManager {
    /**
     * Creates an instance of MemoryManager.
     */
    constructor() {
        this.memory = new Map(); // Memory storage as key-value pairs
    }

    /**
     * Stores a memory with a unique identifier.
     *
     * @param {string} id - Unique identifier for the memory.
     * @param {object} data - Data to be stored in memory.
     * @throws {Error} Throws an error if the id already exists.
     */
    storeMemory(id, data) {
        if (this.memory.has(id)) {
            throw new Error('Memory id already exists.');
        }
        this.memory.set(id, data);
    }

    /**
     * Retrieves a memory by its unique identifier.
     *
     * @param {string} id - Unique identifier for the memory.
     * @returns {object|null} The memory data or null if not found.
     */
    retrieveMemory(id) {
        return this.memory.get(id) || null;
    }

    /**
     * Removes a memory from storage by its unique identifier.
     *
     * @param {string} id - Unique identifier for the memory.
     * @throws {Error} Throws an error if the id does not exist.
     */
    removeMemory(id) {
        if (!this.memory.has(id)) {
            throw new Error('Memory id does not exist.');
        }
        this.memory.delete(id);
    }

    /**
     * Clears all memory storage.
     */
    clearMemory() {
        this.memory.clear();
    }
}

module.exports = MemoryManager;
