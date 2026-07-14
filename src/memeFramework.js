// memeFramework.js

// a simple framework to handle meme creation logic

class Meme {
    constructor(title, image, caption) {
        this.title = title;
        this.image = image;
        this.caption = caption;
    }

    createMeme() {
        // logic to generate meme
        return `Meme: ${this.title}\nImage: ${this.image}\nCaption: ${this.caption}`;
    }
}

class MemeFactory {
    constructor() {
        this.memes = [];
    }

    addMeme(title, image, caption) {
        const newMeme = new Meme(title, image, caption);
        this.memes.push(newMeme);
        return newMeme.createMeme();
    }

    getAllMemes() {
        return this.memes.map(meme => meme.createMeme());
    }
}

// export Meme and MemeFactory for external use
module.exports = { Meme, MemeFactory };