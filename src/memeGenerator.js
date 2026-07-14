// memeGenerator.js

// a chaotic generator of memes, because why not?

const memes = require('./memes');
const memeStyles = require('./memeStyles');
const memeState = require('./memeState');

/**
 * Generates a random meme using a predefined set of templates and styles.
 * @returns {Object} meme - a randomly generated meme object.
 */
function generateRandomMeme() {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    const randomStyle = memeStyles[Math.floor(Math.random() * memeStyles.length)];

    const meme = {
        text: randomMeme.text,
        image: randomMeme.image,
        style: randomStyle,
        createdAt: new Date().toISOString()
    };

    // update meme state with the new meme
    memeState.addMeme(meme);
    return meme;
}

/**
 * Generates a series of memes based on user reactions or trends.
 * @param {number} count - number of memes to generate.
 * @returns {Array} memes - an array of generated memes.
 */
function generateMemeSeries(count) {
    return Array.from({ length: count }, generateRandomMeme);
}

module.exports = {
    generateRandomMeme,
    generateMemeSeries
};

// end of memeGenerator.js
