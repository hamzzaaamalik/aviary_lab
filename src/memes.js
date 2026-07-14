// memes.js - the chaotic playground for our memes

class MemeGenerator {
    constructor() {
        this.memeTemplates = [];
        this.loadTemplates();
    }

    // load default meme templates
    loadTemplates() {
        this.memeTemplates = [
            { id: 1, text: "Distracted Boyfriend", keywords: ["distraction", "relationship"] },
            { id: 2, text: "Drake Hotline Bling", keywords: ["preferences", "choices"] },
            { id: 3, text: "Change My Mind", keywords: ["debate", "opinion"] }
        ];
    }

    // return a random meme template
    getRandomMeme() {
        const randomIndex = Math.floor(Math.random() * this.memeTemplates.length);
        return this.memeTemplates[randomIndex];
    }

    // add a new meme template
    addMemeTemplate(template) {
        this.memeTemplates.push(template);
    }

    // generate a meme with custom text
    generateMeme(customText) {
        const meme = this.getRandomMeme();
        return `{\"meme\": \"${meme.text}\", \"customText\": \"${customText}\"}`;
    }
}

// Exporting the MemeGenerator class
module.exports = MemeGenerator;