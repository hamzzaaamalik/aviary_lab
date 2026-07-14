class MemeState {
    constructor() {
        this.memes = [];
        this.currentIndex = 0;
    }

    addMeme(meme) {
        this.memes.push(meme);
        this.currentIndex = this.memes.length - 1; // point to latest meme
    }

    getCurrentMeme() {
        return this.memes[this.currentIndex];
    }

    nextMeme() {
        if (this.currentIndex < this.memes.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // loop back to start
        }
        return this.getCurrentMeme();
    }

    previousMeme() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.memes.length - 1; // loop to end
        }
        return this.getCurrentMeme();
    }

    getAllMemes() {
        return this.memes;
    }

    clearMemes() {
        this.memes = [];
        this.currentIndex = 0;
    }
}

export default MemeState;