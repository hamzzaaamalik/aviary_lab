function validateMeme(meme) {
    if (!meme) return false;
    if (typeof meme.title !== 'string' || meme.title.trim() === '') return false;
    if (typeof meme.image !== 'string' || !isValidImageUrl(meme.image)) return false;
    return true;
}

function isValidImageUrl(url) {
    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(url);
}

module.exports = { validateMeme };