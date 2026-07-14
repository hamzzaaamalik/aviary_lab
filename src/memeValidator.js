function isValidMeme(meme) {
    if (typeof meme !== 'object' || meme === null) return false;
    const requiredKeys = ['id', 'content', 'style'];
    return requiredKeys.every(key => key in meme);
}

function validateMeme(meme) {
    if (!isValidMeme(meme)) {
        throw new Error('Invalid meme structure.');
    }
    // Additional validation logic can be placed here.
}

module.exports = {
    isValidMeme,
    validateMeme,
};