// memeFramework.js

class MemeFramework {
    constructor() {
        this.memeList = [];
    }

    addMeme(meme) {
        if (!this.isValidMeme(meme)) {
            throw new Error('Invalid meme.');
        }
        this.memeList.push(meme);
    }

    isValidMeme(meme) {
        return meme && typeof meme === 'object' && meme.text;
    }

    getMemes() {
        return this.memeList;
    }

    clearMemes() {
        this.memeList = [];
    }
}

export default MemeFramework;