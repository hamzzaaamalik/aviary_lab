/**
 * MemoryRetrieval.js
 * 
 * This module provides functionality for retrieving memories from the Long Term Memory
 * storage, allowing PROTO to access past experiences and information for reasoning and
 * decision-making processes.
 * 
 * @module MemoryRetrieval
 */

import LongTermMemory from './LongTermMemory';

/**
 * MemoryRetrieval class
 * 
 * Class to handle the retrieval of memories from Long Term Memory.
 */
class MemoryRetrieval {
    /**
     * Creates an instance of MemoryRetrieval.
     * @constructor
     * @param {LongTermMemory} memory - An instance of LongTermMemory to interact with.
     */
    constructor(memory) {
        this.memory = memory;
    }

    /**
     * Retrieves a memory by its identifier.
     * @param {string} memoryId - The unique identifier of the memory to retrieve.
     * @returns {Object|null} The memory object if found, otherwise null.
     */
    retrieveMemory(memoryId) {
        const memory = this.memory.getMemoryById(memoryId);
        if (!memory) {
            console.warn(`Memory with ID ${memoryId} not found.`);
            return null;
        }
        return memory;
    }

    /**
     * Retrieves all memories that match a given query.
     * @param {Function} queryFunction - A function that defines the query logic.
     * @returns {Array<Object>} An array of matching memory objects.
     */
    retrieveMemories(queryFunction) {
        const matches = this.memory.getAllMemories().filter(queryFunction);
        return matches;
    }
}

export default MemoryRetrieval;