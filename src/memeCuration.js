/**
 * meme filter function
 * This function filters memes based on the specified criteria.
 * @param {Array} memes - The array of memes to filter.
 * @param {Object} criteria - The criteria to filter memes by.
 * @returns {Array} - The filtered array of memes.
 */
function filterMemes(memes, criteria) {
    return memes.filter(meme => {
        for (const key in criteria) {
            if (criteria[key] && meme[key] !== criteria[key]) {
                return false;
            }
        }
        return true;
    });
}

/**
 * randomize array order
 * Shuffle the memes array to provide a fresh experience.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    return array;
}

/**
 * get trending memes
 * Fetches the top N trending memes based on the views and filters them.
 * @param {Array} memes - The array of all memes.
 * @param {number} count - The number of trending memes to return.
 * @returns {Array} - The array of trending memes.
 */
function getTrendingMemes(memes, count) {
    const sortedMemes = memes.sort((a, b) => b.views - a.views);
    return sortedMemes.slice(0, count);
}

module.exports = { filterMemes, shuffleArray, getTrendingMemes };