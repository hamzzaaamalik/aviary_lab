/**
 * Recall module for retrieving information from LongTermMemory.
 * This module handles short- and long-term memory recall operations.
 */
class Recall {
    constructor(longTermMemory) {
        this.longTermMemory = longTermMemory;
    }

    /**
     * Retrieves an item from long-term memory based on a query.
     * @param {string} query - The input query used to retrieve data.
     * @returns {Object|null} - The retrieved memory object or null if not found.
     */
    recall(query) {
        const result = this.longTermMemory.getMemoryItem(query);
        return result ? result : null;
    }

    /**
     * Retrieves all memories related to a specific context.
     * @param {string} context - The context keyword to filter memories.
     * @returns {Array<Object>} - Array of memory objects related to the context.
     */
    recallByContext(context) {
        return this.longTermMemory.getMemoryByContext(context);
    }

    /**
     * Provides a summary of the recalled memories, useful for displaying.
     * @param {Array<Object>} memories - The list of memories to summarize.
     * @returns {string} - A summary string of the memories.
     */
    summarizeMemories(memories) {
        if (memories.length === 0) return 'No memories found.';
        return memories.map(memory => `Memory: ${memory.data}, Timestamp: ${memory.timestamp}`).join('\n');
    }
}

module.exports = Recall;