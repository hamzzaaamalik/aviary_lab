function validateMeme(meme) {
    if (!meme.title || typeof meme.title !== 'string') {
        throw new Error('Invalid meme title.');
    }
    if (!meme.content || typeof meme.content !== 'string') {
        throw new Error('Invalid meme content.');
    }
    if (meme.styles && !Array.isArray(meme.styles)) {
        throw new Error('Styles should be an array.');
    }
    // Additional validation checks can be added here
    return true;
}

module.exports = { validateMeme };