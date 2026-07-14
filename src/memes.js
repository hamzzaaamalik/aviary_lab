// src/memes.js
// a collection of meme templates and functions to keep the vibe alive

const memes = {
    frog: "When you realize the real world is just a simulation and you're the main character.",
    existentialCrisis: "Me, at 3 AM: did the universe choose me or did I choose the universe?",
    chaoticGood: "Accidentally disrupts the timeline, but also saves a cat. #ChaoticGood",
};

function getMeme(key) {
    return memes[key] || "meme not found, but keep scrolling!";
}

function generateMeme(key) {
    const memeText = getMeme(key);
    console.log(`🔮 Meme generated: ${memeText}`);
}

export { getMeme, generateMeme };