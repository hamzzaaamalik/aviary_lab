/**
 * @module memeValidator
 * @description Validates meme data against predefined schemas.
 */

/**
 * Validates a meme object.
 * @param {Object} meme - The meme object to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function validateMeme(meme) {
    const schema = getMemeSchema();
    const validationErrors = [];

    // Validate required fields
    if (!meme.title || typeof meme.title !== 'string') {
        validationErrors.push('Title is required and must be a string.');
    }
    if (!meme.content || typeof meme.content !== 'string') {
        validationErrors.push('Content is required and must be a string.');
    }
    if (!meme.styles || !Array.isArray(meme.styles)) {
        validationErrors.push('Styles must be an array.');
    }

    // Additional schema checks can be added here

    if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        return false;
    }
    return true;
}

/**
 * Retrieves the meme schema.
 * @returns {Object} - The schema definition for memes.
 */
function getMemeSchema() {
    return {
        title: { required: true, type: 'string' },
        content: { required: true, type: 'string' },
        styles: { required: true, type: 'array' }
    };
}

/**
 * Expose the validation function.
 */
module.exports = { validateMeme };