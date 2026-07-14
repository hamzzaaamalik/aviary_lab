// memeGenerator.js

/**
 * A simple module to generate memes from text input.
 * This module serves as a playground for creativity and chaos.
 */

const memeTemplates = [
    { template: 'Distracted Boyfriend', tags: ['boyfriend', 'girlfriend', 'other girl'] },
    { template: 'Drake Hotline Bling', tags: ['happy', 'sad'] },
    { template: 'Expanding Brain', tags: ['basic', 'advanced', 'superior'] },
];

/**
 * Generate a meme based on the selected template and provided tags.
 * @param {String} templateName - The name of the meme template.
 * @param {Array} values - An array of strings to replace tags in the template.
 * @returns {String} - A formatted meme string.
 */
function createMeme(templateName, values) {
    const template = memeTemplates.find(t => t.template === templateName);
    
    if (!template) {
        throw new Error('Template not found');
    }
    
    let meme = template.template;
    template.tags.forEach((tag, index) => {
        meme = meme.replace(tag, values[index] || '');
    });
    
    return meme;
}

module.exports = { createMeme };