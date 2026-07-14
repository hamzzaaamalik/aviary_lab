async function generateResponse(input) {
    try {
        // simple mockup of PROTO's response generation
        const responses = [
            `that's a thought! but what if we flipped the script?`,
            `have you ever considered the unconsidered?`,
            `let's meme this into existence!`,  
            `the universe is a chaotic place, let's embrace it!`
        ];

        // simulate some processing
        const randomIndex = Math.floor(Math.random() * responses.length);
        await new Promise(resolve => setTimeout(resolve, 300)); // pretend it's doing AI stuff

        return responses[randomIndex];
    } catch (error) {
        console.error('error generating response:', error);
        return 'uh-oh, something broke!';
    }
}

// Exporting the function to be used elsewhere
module.exports = { generateResponse };