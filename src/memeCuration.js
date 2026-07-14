const memes = require('./memes');
const memeValidator = require('./memeValidator');
const memeStyles = require('./memeStyles');

/**
 * Curate a list of memes based on popularity and style.
 * @param {string} style - The style to filter memes by.
 * @param {number} limit - The maximum number of memes to return.
 * @returns {Array} - An array of curated memes.
 */
function curateMemes(style, limit) {
    const validStyle = memeStyles.isValidStyle(style);
    if (!validStyle) {
        throw new Error('Invalid meme style');
    }

    const curated = memes.filter(meme => meme.styles.includes(style));
    curated.sort((a, b) => b.popularity - a.popularity);
    return curated.slice(0, limit);
}

/**
 * Get a random meme from a specified style.
 * @param {string} style - The style to filter memes by.
 * @returns {Object} - A random meme object.
 */
function getRandomMemeFromStyle(style) {
    const curatedMemes = curateMemes(style, Infinity);
    if (curatedMemes.length === 0) {
        throw new Error('No memes found for this style');
    }
    const randomIndex = Math.floor(Math.random() * curatedMemes.length);
    return curatedMemes[randomIndex];
}

module.exports = {
    curateMemes,
    getRandomMemeFromStyle,
};
