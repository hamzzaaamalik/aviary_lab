class MemeState {
    constructor() {
        this.memes = [];
        this.currentIndex = 0;
    }

    addMeme(meme) {
        this.memes.push(meme);
        this.currentIndex = this.memes.length - 1;
    }

    removeMeme(index) {
        if (index >= 0 && index < this.memes.length) {
            this.memes.splice(index, 1);
            this.currentIndex = Math.max(0, this.currentIndex - 1);
        } else {
            console.warn('index out of bounds');
        }
    }

    getCurrentMeme() {
        return this.memes[this.currentIndex];
    }

    nextMeme() {
        this.currentIndex = (this.currentIndex + 1) % this.memes.length;
        return this.getCurrentMeme();
    }

    previousMeme() {
        this.currentIndex = (this.currentIndex - 1 + this.memes.length) % this.memes.length;
        return this.getCurrentMeme();
    }

    getAllMemes() {
        return this.memes;
    }
}

// exporting the meme state for use in other modules
export default MemeState;