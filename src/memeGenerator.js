// memeGenerator.js

// this module handles the creation of new memes

function createMeme(template, text) {
    // check if the template exists
    if (!templates[template]) {
        throw new Error('Template not found!');
    }
    // generate the meme using the provided template and text
    const meme = {
        template: template,
        text: text,
        createdAt: new Date(),
    };
    return meme;
}

// predefined templates
const templates = {
    basic: 'https://example.com/basic-template.png',
    epic: 'https://example.com/epic-template.png',
    doge: 'https://example.com/doge-template.png',
};

// export the createMeme function for use in other modules
module.exports = { createMeme };