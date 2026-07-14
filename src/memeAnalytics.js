/**
 * @module memeAnalytics
 * 
 * This module provides analytics capabilities for tracking meme performance and engagement. 
 * It includes functions to log views, shares, and user interactions with memes.
 */

class MemeAnalytics {
    constructor() {
        this.memeData = {};
    }

    /**
     * Log a view for a specific meme.
     * @param {string} memeId - The unique identifier of the meme.
     * @returns {void}
     */
    logView(memeId) {
        this._initializeMemeData(memeId);
        this.memeData[memeId].views++;
    }

    /**
     * Log a share for a specific meme.
     * @param {string} memeId - The unique identifier of the meme.
     * @returns {void}
     */
    logShare(memeId) {
        this._initializeMemeData(memeId);
        this.memeData[memeId].shares++;
    }

    /**
     * Log an interaction for a specific meme.
     * @param {string} memeId - The unique identifier of the meme.
     * @returns {void}
     */
    logInteraction(memeId) {
        this._initializeMemeData(memeId);
        this.memeData[memeId].interactions++;
    }

    /**
     * Retrieve the analytics data for a specific meme.
     * @param {string} memeId - The unique identifier of the meme.
     * @returns {Object} - The analytics data for the meme.
     */
    getMemeAnalytics(memeId) {
        return this.memeData[memeId] || null;
    }

    /**
     * Initialize meme data if it doesn't exist.
     * @private
     * @param {string} memeId - The unique identifier of the meme.
     */
    _initializeMemeData(memeId) {
        if (!this.memeData[memeId]) {
            this.memeData[memeId] = { views: 0, shares: 0, interactions: 0 };
        }
    }
}

// export the instance of MemeAnalytics
const memeAnalytics = new MemeAnalytics();
export default memeAnalytics;