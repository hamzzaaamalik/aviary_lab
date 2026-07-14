// src/memes.js

// a collection of meme functions to bring joy and chaos to the world

// function to generate a classic doge meme
function createDogeMeme(text) {
    return `much wow, ${text} such meme!`;
}

// function to fetch a random frog meme
function getRandomFrogMeme() {
    const frogs = [
        'froggo derp',
        'pepe the frog',
        'dat boi',
        'this is fine frog'
    ];
    return frogs[Math.floor(Math.random() * frogs.length)];
}

// function to create a personalized meme
function generateMeme(name, phrase) {
    return `${name} says: ${phrase}. That's a certified meme!`;
}

// export the meme functions for use in other modules
module.exports = { createDogeMeme, getRandomFrogMeme, generateMeme };