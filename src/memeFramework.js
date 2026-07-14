// memeFramework.js

// central module for meme operations

class MemeFramework {
    constructor() {
        this.memes = [];
    }
    
    addMeme(meme) {
        if (this.validateMeme(meme)) {
            this.memes.push(meme);
        }
    }
    
    validateMeme(meme) {
        // validate meme structure
        return meme && meme.content && typeof meme.content === 'string';
    }
    
    getMemes() {
        return this.memes;
    }
}

export default MemeFramework;