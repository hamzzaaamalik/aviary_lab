/**
 * MemeCuration - A module for curating and managing memes.
 * Provides functionality to add, remove, and retrieve curated memes.
 *
 * @module MemeCuration
 */

class MemeCuration {
    constructor() {
        this.curatedMemes = [];
    }

    /**
     * Adds a new meme to the curated list.
     * @param {Object} meme - The meme object to be added.
     * @throws {Error} If meme is already curated.
     */
    addMeme(meme) {
        if (this.curatedMemes.some(existingMeme => existingMeme.id === meme.id)) {
            throw new Error('Meme already curated.');
        }
        this.curatedMemes.push(meme);
    }

    /**
     * Removes a meme from the curated list.
     * @param {string} memeId - The ID of the meme to be removed.
     * @throws {Error} If meme is not found.
     */
    removeMeme(memeId) {
        const memeIndex = this.curatedMemes.findIndex(meme => meme.id === memeId);
        if (memeIndex === -1) {
            throw new Error('Meme not found.');
        }
        this.curatedMemes.splice(memeIndex, 1);
    }

    /**
     * Retrieves all curated memes.
     * @returns {Array} Array of curated memes.
     */
    getCuratedMemes() {
        return this.curatedMemes;
    }

    /**
     * Searches for curated memes based on a keyword.
     * @param {string} keyword - The keyword to search for.
     * @returns {Array} Array of memes containing the keyword.
     */
    searchMemes(keyword) {
        return this.curatedMemes.filter(meme => meme.title.includes(keyword) || meme.description.includes(keyword));
    }
}

module.exports = new MemeCuration();
