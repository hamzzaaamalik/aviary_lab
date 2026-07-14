/**
 * MemoryManager class handles the organization and retrieval of memories in PROTO.
 * It facilitates efficient storage and recall processes, allowing PROTO to learn from past experiences.
 *
 * @class MemoryManager
 */
class MemoryManager {
    constructor() {
        this.longTermMemories = new Map();  // Stores long-term memories by ID
        this.recentMemories = [];  // Stores recent memories for quick access
    }

    /**
     * Adds a new memory to the system.
     * @param {string} id - Unique identifier for the memory.
     * @param {Object} memory - The memory object to be stored.
     * @throws Will throw an error if the memory ID already exists.
     */
    addMemory(id, memory) {
        if (this.longTermMemories.has(id)) {
            throw new Error(`Memory with ID ${id} already exists.`);
        }
        this.longTermMemories.set(id, memory);
        this.recentMemories.push(memory);
        this.trimRecentMemories(); // Keep recent memories limited to a reasonable size
    }

    /**
     * Retrieves a memory based on its ID.
     * @param {string} id - The unique identifier of the memory.
     * @returns {Object|null} - The memory object or null if not found.
     */
    getMemory(id) {
        return this.longTermMemories.get(id) || null;
    }

    /**
     * Trims the recent memories array to keep it at a manageable size.
     * If the size exceeds 100, the oldest memories are removed.
     */
    trimRecentMemories() {
        if (this.recentMemories.length > 100) {
            this.recentMemories.shift();  // Remove the oldest memory
        }
    }

    /**
     * Recalls recent memories, optionally filtered by a specific criterion.
     * @param {Function} filterFn - Optional filter function to apply to memories.
     * @returns {Array} - Array of recalled memories matching the filter.
     */
    recallRecentMemories(filterFn) {
        if (filterFn) {
            return this.recentMemories.filter(filterFn);
        }
        return this.recentMemories;
    }
}

module.exports = MemoryManager;