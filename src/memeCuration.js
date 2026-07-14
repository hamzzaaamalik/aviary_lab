// memeCuration.js

// This module is responsible for curating memes based on user preferences and trending topics.

const memes = require('./memes');
const { getTrendingTopics } = require('./memeGenerator');

class MemeCuration {
    constructor() {
        this.curatedMemes = [];
    }

    // Fetch trending topics and curate memes accordingly
    async curateMemes() {
        const trendingTopics = await getTrendingTopics();
        this.curatedMemes = memes.filter(meme => 
            trendingTopics.some(topic => meme.tags.includes(topic))
        );
        return this.curatedMemes;
    }

    // Get a random curated meme
    getRandomCuratedMeme() {
        const randomIndex = Math.floor(Math.random() * this.curatedMemes.length);
        return this.curatedMemes[randomIndex];
    }
}

module.exports = new MemeCuration();