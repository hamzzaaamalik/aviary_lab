// memeValidator.js

/**
 * Validates the structure and content of a meme object.
 * @param {Object} meme - The meme object to validate.
 * @returns {boolean} - True if the meme is valid, false otherwise.
 */
function validateMeme(meme) {
    const requiredFields = ['id', 'content', 'style'];

    for (const field of requiredFields) {
        if (!(field in meme)) {
            console.error(`Meme validation failed: Missing field '${field}'.`);
            return false;
        }
    }

    if (typeof meme.content !== 'string' || meme.content.length === 0) {
        console.error('Meme validation failed: Content must be a non-empty string.');
        return false;
    }

    if (typeof meme.style !== 'string' || meme.style.length === 0) {
        console.error('Meme validation failed: Style must be a non-empty string.');
        return false;
    }

    return true;
}

module.exports = { validateMeme };