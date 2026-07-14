/**
 * memeFramework.js
 * 
 * A module that encapsulates the core functionalities for handling memes, including validation, analytics, and generation.
 * 
 * @module memeFramework
 */

// Import necessary components
const memeValidator = require('./memeValidator');
const memeGenerator = require('./memeGenerator');
const memeAnalytics = require('./memeAnalytics');
const memeCuration = require('./memeCuration');

/**
 * Class representing the Meme Framework.
 */
class MemeFramework {
    constructor() {
        this.memes = [];
    }

    /**
     * Adds a new meme after validation.
     * @param {Object} meme - The meme object to be added.
     * @throws Will throw an error if the meme is invalid.
     */
    addMeme(meme) {
        if (memeValidator.validate(meme)) {
            this.memes.push(meme);
        } else {
            throw new Error('Invalid meme format');
        }
    }

    /**
     * Generates a random meme using the meme generator.
     * @returns {Object} The generated meme object.
     */
    generateRandomMeme() {
        return memeGenerator.generate();
    }

    /**
     * Analyzes the current memes in the framework.
     * @returns {Object} Analysis results.
     */
    analyzeMemes() {
        return memeAnalytics.analyze(this.memes);
    }

    /**
     * Curates memes based on specified criteria.
     * @param {Function} criteria - The function that defines curation criteria.
     * @returns {Array} The curated memes.
     */
    curateMemes(criteria) {
        return memeCuration.curate(this.memes, criteria);
    }

    /**
     * Returns all memes in the framework.
     * @returns {Array} The list of memes.
     */
    getAllMemes() {
        return this.memes;
    }
}

module.exports = new MemeFramework();