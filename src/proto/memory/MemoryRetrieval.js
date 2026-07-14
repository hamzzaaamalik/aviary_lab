/**
 * MemoryRetrieval class for managing memory queries and retrieval operations.
 * This class provides methods to retrieve information from memory based on various criteria.
 */
class MemoryRetrieval {
    constructor(memoryManager) {
        /**
         * @type {MemoryManager}
         */
        this.memoryManager = memoryManager;
    }

    /**
     * Retrieve a memory entry by its unique identifier.
     * @param {string} id - The unique identifier of the memory entry.
     * @returns {Object|null} - The retrieved memory entry or null if not found.
     */
    getMemoryById(id) {
        const memoryEntry = this.memoryManager.getEntryById(id);
        return memoryEntry || null;
    }

    /**
     * Retrieve all memory entries that match the provided criteria.
     * @param {Function} criteria - A function that determines whether a memory entry matches.
     * @returns {Array} - An array of matching memory entries.
     */
    getMemoryByCriteria(criteria) {
        return this.memoryManager.getAllEntries().filter(criteria);
    }

    /**
     * Retrieve a summary of all memory entries for a quick overview.
     * @returns {Array} - An array of summary objects for each memory entry.
     */
    getMemorySummary() {
        return this.memoryManager.getAllEntries().map(entry => ({ id: entry.id, summary: entry.summary }));
    }

    /**
     * Clear all memory entries based on a specific condition.
     * @param {Function} condition - A function that determines which entries to clear.
     */
    clearMemoryByCondition(condition) {
        const entriesToClear = this.memoryManager.getAllEntries().filter(condition);
        entriesToClear.forEach(entry => this.memoryManager.removeEntry(entry.id));
    }
}

module.exports = MemoryRetrieval;