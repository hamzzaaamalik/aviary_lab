class MemeCuration {
  constructor() {
    this.memes = new Map();
  }

  addMeme(id, memeData) {
    if (this.memes.has(id)) {
      throw new Error(`Meme with id ${id} already exists.`);
    }
    this.memes.set(id, memeData);
  }

  getMeme(id) {
    return this.memes.get(id) || null;
  }

  removeMeme(id) {
    if (!this.memes.has(id)) {
      throw new Error(`No meme found with id ${id}.`);
    }
    this.memes.delete(id);
  }

  getAllMemes() {
    return Array.from(this.memes.entries()).map(([id, data]) => ({ id, ...data }));
  }
}

export default MemeCuration;