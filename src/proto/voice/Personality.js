/**
 * Personality module for voice synthesis.
 * Provides personality traits and modifies utterances accordingly.
 *
 * @module Personality
 */

class Personality {
    /**
     * Creates a new Personality instance.
     * @param {string} name - The name of the personality.
     * @param {Object} traits - The traits that define this personality.
     */
    constructor(name, traits) {
        this.name = name;
        this.traits = traits;
    }

    /**
     * Modifies an utterance based on personality traits.
     * @param {string} utterance - The base utterance to modify.
     * @returns {string} - The modified utterance.
     */
    modifyUtterance(utterance) {
        let modifiedUtterance = utterance;
        if (this.traits.formality) {
            modifiedUtterance = this.modifyForFormality(modifiedUtterance);
        }
        if (this.traits.emotion) {
            modifiedUtterance = this.addEmotion(modifiedUtterance);
        }
        return modifiedUtterance;
    }

    /**
     * Adjusts the utterance for formality.
     * @param {string} utterance - Base utterance.
     * @returns {string} - Formal or informal version of the utterance.
     */
    modifyForFormality(utterance) {
        return this.traits.formality === 'formal' 
            ? `Dear User, ${utterance}` 
            : `${utterance}`;
    }

    /**
     * Adds emotional tone to the utterance.
     * @param {string} utterance - Base utterance.
     * @returns {string} - Emotionally adjusted utterance.
     */
    addEmotion(utterance) {
        return this.traits.emotion === 'happy' 
            ? `${utterance} 😊` 
            : `${utterance}...`;
    }
}

module.exports = Personality;
