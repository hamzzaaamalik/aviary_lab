// memeGenerator.js
// a module to create and curate memes in the lab

const { generateMemeTemplate } = require('./memeFramework');
const { fetchRandomImage } = require('./memes');

class MemeGenerator {
    constructor() {
        this.templates = [];
    }

    // Load meme templates from the framework
    loadTemplates() {
        this.templates = generateMemeTemplate();
        console.log('Loaded meme templates:', this.templates);
    }

    // Generate a meme using a random image and a template
    async createMeme() {
        const image = await fetchRandomImage();
        const template = this.getRandomTemplate();
        const meme = this.applyTemplate(image, template);
        console.log('Generated meme:', meme);
        return meme;
    }

    // Select a random template
    getRandomTemplate() {
        const randomIndex = Math.floor(Math.random() * this.templates.length);
        return this.templates[randomIndex];
    }

    // Apply template to image
    applyTemplate(image, template) {
        return `${template.text} - ${image.url}`;
    }
}

module.exports = new MemeGenerator();