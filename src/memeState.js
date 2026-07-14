class MemeState {
    constructor() {
        this.memes = {};
    }

    addMeme(id, meme) {
        this.memes[id] = meme;
    }

    getMeme(id) {
        return this.memes[id] || null;
    }

    removeMeme(id) {
        delete this.memes[id];
    }

    clear() {
        this.memes = {};
    }

    getAllMemes() {
        return Object.values(this.memes);
    }
}

export default MemeState;
