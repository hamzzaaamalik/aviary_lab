/**
 * Class that bridges perception and memory management.
 * It connects the percepts from perception to the memory store.
 */
export class PerceptionMemoryBridge {
    constructor(memory) {
        this.memory = memory;
    }

    /**
     * Save a percept to memory.
     * @param {Object} percept - The percept to save.
     * @throws {Error} If the percept cannot be saved.
     */
    savePercept(percept) {
        if (!percept || typeof percept !== 'object') {
            throw new Error('Invalid percept');
        }
        this.memory.store(percept);
    }

    /**
     * Retrieve a percept from memory.
     * @param {string} key - The key to fetch the percept.
     * @returns {Object|null} The retrieved percept or null if not found.
     */
    retrievePercept(key) {
        return this.memory.retrieve(key);
    }
}
