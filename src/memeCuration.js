// src/memeCuration.js

// Import necessary modules
import { validateMeme } from './memeValidator.js';
import { getTrendingMemes } from './memes.js';

// Function to curate memes based on trends and validation
export const curateMemes = async () => {
    try {
        const memes = await getTrendingMemes();
        const curatedMemes = memes.filter(meme => validateMeme(meme));

        console.log('Curated Memes:', curatedMemes);
        return curatedMemes;
    } catch (error) {
        console.error('Error curating memes:', error);
    }
};

// Function to add a new meme to the curated list
export const addCuratedMeme = (meme, curatedList) => {
    if (validateMeme(meme)) {
        curatedList.push(meme);
        console.log('Added meme to curated list:', meme);
    } else {
        console.warn('Meme failed validation:', meme);
    }
};

// Example of usage:
// const curatedList = [];
// addCuratedMeme(newMeme, curatedList);
