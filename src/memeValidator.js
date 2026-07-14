/**
 * Validates meme objects against specified rules.
 * 
 * @module memeValidator
 */

const validFormats = ['image/png', 'image/jpeg', 'image/gif'];

/**
 * Checks if the provided meme object is valid.
 * 
 * @param {Object} meme - The meme object to validate.
 * @param {string} meme.title - The title of the meme.
 * @param {string} meme.imageUrl - The URL of the meme image.
 * @param {string} meme.format - The image format of the meme.
 * @throws {Error} Throws error if validation fails.
 */
function validateMeme(meme) {
    if (!meme.title || meme.title.length === 0) {
        throw new Error('Meme must have a title.');
    }
    if (!isValidImageUrl(meme.imageUrl)) {
        throw new Error('Invalid image URL.');
    }
    if (!validFormats.includes(meme.format)) {
        throw new Error(`Unsupported format: ${meme.format}.`);
    }
}

/**
 * Checks if the URL is a valid image URL.
 * 
 * @param {string} url - The URL to check.
 * @returns {boolean} True if URL is valid, false otherwise.
 */
function isValidImageUrl(url) {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/;
    return pattern.test(url);
}

module.exports = {
    validateMeme,
};
