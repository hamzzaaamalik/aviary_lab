class MemeState {
    constructor() {
        this.memes = new Map();
        this.history = []; // track history for undo/redo
    }

    addMeme(id, meme) {
        if (this.memes.has(id)) {
            throw new Error('Meme already exists.');
        }
        this.memes.set(id, meme);
        this.history.push({ action: 'add', id, meme });
    }

    removeMeme(id) {
        if (!this.memes.has(id)) {
            throw new Error('Meme not found.');
        }
        const meme = this.memes.get(id);
        this.memes.delete(id);
        this.history.push({ action: 'remove', id, meme });
    }

    getMeme(id) {
        return this.memes.get(id) || null;
    }

    getAllMemes() {
        return Array.from(this.memes.values());
    }

    undo() {
        const lastAction = this.history.pop();
        if (!lastAction) return;
        const { action, id, meme } = lastAction;
        if (action === 'add') {
            this.memes.delete(id);
        } else if (action === 'remove') {
            this.memes.set(id, meme);
        }
    }
} 

export default MemeState;