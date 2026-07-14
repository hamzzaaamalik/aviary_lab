/**
 * MemeCuration class for managing and curating memes based on various criteria.
 * @class
 */
class MemeCuration {
    constructor() {
        this.memes = [];
    }

    /**
     * Adds a new meme to the curation list.
     * @param {Object} meme - The meme object to be added.
     * @throws {Error} If the meme object is invalid.
     */
    addMeme(meme) {
        if (!this.isValidMeme(meme)) {
            throw new Error('Invalid meme object.');
        }
        this.memes.push(meme);
    }

    /**
     * Validates if a meme object is valid.
     * @param {Object} meme - The meme object to validate.
     * @returns {boolean} True if valid, otherwise false.
     */
    isValidMeme(meme) {
        return meme && typeof meme.title === 'string' && typeof meme.imageUrl === 'string';
    }

    /**
     * Gets a curated list of memes that meet specific criteria.
     * @param {Function} criteria - A function that defines the filtering criteria.
     * @returns {Array} Array of curated memes.
     */
    getCuratedMemes(criteria) {
        return this.memes.filter(criteria);
    }

    /**
     * Removes a meme from the curation list.
     * @param {string} title - The title of the meme to be removed.
     * @returns {boolean} True if the meme was removed, otherwise false.
     */
    removeMeme(title) {
        const index = this.memes.findIndex(meme => meme.title === title);
        if (index !== -1) {
            this.memes.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = MemeCuration;