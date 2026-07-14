// memeCuration.js - curating the chaotic internet

// Import the meme database for access to memes
import { memes } from './memes';

/**
 * Curate a selection of memes based on user engagement and freshness.
 * @param {number} limit - The maximum number of memes to return.
 * @returns {Array} - An array of curated memes.
 */
export function curateMemes(limit) {
    // Filter out memes based on a simple engagement metric
    const curated = memes.filter(meme => meme.engagement > 50).sort((a, b) => b.date - a.date);
    // Limit the number of memes returned
    return curated.slice(0, limit);
}

/**
 * Get trending memes based on a time window.
 * @param {number} days - Number of days to consider for trending.
 * @returns {Array} - An array of trending memes.
 */
export function getTrendingMemes(days) {
    const now = Date.now();
    const cutoff = now - (days * 24 * 60 * 60 * 1000);  // Convert days to milliseconds
    // Filter memes that have been created within the time frame
    return memes.filter(meme => meme.date > cutoff).sort((a, b) => b.engagement - a.engagement);
}

/**
 * Get a random meme from the curated list.
 * @returns {Object|null} - A random meme object or null if none exist.
 */
export function getRandomCuratedMeme() {
    const curatedMemes = curateMemes(10);
    if (curatedMemes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * curatedMemes.length);
    return curatedMemes[randomIndex];
}