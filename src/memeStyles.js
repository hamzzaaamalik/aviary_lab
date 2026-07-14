// src/memeStyles.js

// A collection of meme styles to add personality and flair

const memeStyles = {
    classic: {
        font: 'Impact',
        color: '#FFFFFF',
        outline: '2px solid #000000',
        positioning: 'center',
    },
    retro: {
        font: 'Comic Sans MS',
        color: '#FF69B4',
        outline: '3px dashed #FFD700',
        positioning: 'top-left',
    },
    minimalist: {
        font: 'Arial',
        color: '#000000',
        outline: 'none',
        positioning: 'bottom-right',
    },
    surreal: {
        font: 'Courier New',
        color: '#00FF7F',
        outline: '1px solid #800080',
        positioning: 'center',
    },
};

export default memeStyles;

// Function to get a random meme style
export function getRandomMemeStyle() {
    const styles = Object.keys(memeStyles);
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    return memeStyles[randomStyle];
}