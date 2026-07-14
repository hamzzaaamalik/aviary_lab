const { randomElement } = require('./memeFramework');

// Add more meme formats to keep things fresh
const memeFormats = [
    { template: 'Distracted Boyfriend', captions: ['Me', 'My responsibilities', 'Random Internet Memes'] },
    { template: 'Two Buttons', captions: ['Sleep', 'Existential Crisis'] },
    { template: 'Change My Mind', captions: ['This is a meme', 'Change my mind'] },
    { template: 'Is This a Pigeon?', captions: ['Is this a meme?', 'Yes.'] }
];

// Function to generate a random meme
function generateMeme() {
    const format = randomElement(memeFormats);
    const caption1 = randomElement(format.captions);
    const caption2 = randomElement(format.captions.filter(c => c !== caption1));
    return `Meme Format: ${format.template}\nCaption 1: ${caption1}\nCaption 2: ${caption2}`;
}

// Export the generateMeme function to be used elsewhere
module.exports = { generateMeme };