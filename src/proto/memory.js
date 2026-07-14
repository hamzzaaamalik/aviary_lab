/**
 * @module memory
 * @description This module manages the memory system for PROTO, allowing it to store and retrieve meme-related data efficiently.
 */

class Memory {
    constructor() {
        this.store = new Map();
    }

    /**
     * Stores a meme in memory with a unique identifier.
     * @param {string} id - The unique identifier for the meme.
     * @param {Object} memeData - The data associated with the meme.
     * @throws {Error} Throws an error if the meme is already stored.
     */
    storeMeme(id, memeData) {
        if (this.store.has(id)) {
            throw new Error('Meme with this ID already exists.');
        }
        this.store.set(id, memeData);
    }

    /**
     * Retrieves a meme from memory using its unique identifier.
     * @param {string} id - The unique identifier for the meme.
     * @returns {Object|null} The meme data or null if not found.
     */
    getMeme(id) {
        return this.store.get(id) || null;
    }

    /**
     * Checks if a meme exists in memory.
     * @param {string} id - The unique identifier for the meme.
     * @returns {boolean} True if the meme exists, false otherwise.
     */
    memeExists(id) {
        return this.store.has(id);
    }

    /**
     * Clears all memes from memory.
     */
    clearMemory() {
        this.store.clear();
    }
}

module.exports = new Memory();