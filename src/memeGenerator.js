// memeGenerator.js

// generate a random meme based on given templates and contexts

const fs = require('fs');
const path = require('path');
const { getRandomElement } = require('./memeUtils');

// define meme templates, baby
const memeTemplates = [
    { template: 'Distracted Boyfriend', caption: ['Me', 'My Responsibilities', 'Random Internet Drama'] },
    { template: 'Drake Hotline Bling', caption: ['Drake', 'Not Using My Time Wisely', 'Using My Time Wisely'] },
    { template: 'Two Buttons', caption: ['The Right Choice', 'The Wrong Choice'] },
];

// generate a meme
function generateMeme() {
    const selectedTemplate = getRandomElement(memeTemplates);
    const selectedCaption = getRandomElement(selectedTemplate.caption);
    return {
        template: selectedTemplate.template,
        caption: selectedCaption,
        timestamp: new Date().toISOString()
    };
}

// save meme to file
function saveMeme(meme) {
    const memeDir = path.join(__dirname, '../memes');
    if (!fs.existsSync(memeDir)) fs.mkdirSync(memeDir);
    const memeFilePath = path.join(memeDir, `meme-${Date.now()}.json`);
    fs.writeFileSync(memeFilePath, JSON.stringify(meme, null, 2));
    console.log(`saved meme to ${memeFilePath}`);
}

// export the functions
module.exports = { generateMeme, saveMeme };