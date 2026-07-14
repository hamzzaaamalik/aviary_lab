class MemeCuration {
    constructor() {
        this.memes = [];
    }

    addMeme(meme) {
        if (this.validateMeme(meme)) {
            this.memes.push(meme);
        } else {
            throw new Error('Invalid meme format.');
        }
    }

    validateMeme(meme) {
        return meme.hasOwnProperty('id') && meme.hasOwnProperty('content');
    }

    getMemes() {
        return this.memes;
    }

    findMemeById(id) {
        return this.memes.find(meme => meme.id === id);
    }
}

export default MemeCuration;
