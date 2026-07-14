/**
 * UtteranceBuilder.js
 * Responsible for constructing utterances based on input parameters.
 * This module allows for dynamic generation of voice outputs that align with PROTO's personality.
 */

class UtteranceBuilder {
    constructor() {
        this.defaultTone = 'neutral';
    }

    /**
     * Sets the default tone for the utterances.
     * @param {string} tone - The tone to set as default.
     */
    setDefaultTone(tone) {
        if (typeof tone !== 'string') {
            throw new Error('Tone must be a string.');
        }
        this.defaultTone = tone;
    }

    /**
     * Builds an utterance from the given text and tone.
     * @param {string} text - The text to be converted into an utterance.
     * @param {string} [tone] - Optional tone for the utterance. Falls back to default if not provided.
     * @returns {Object} - An object representing the constructed utterance.
     */
    buildUtterance(text, tone) {
        if (typeof text !== 'string' || text.trim() === '') {
            throw new Error('Text must be a non-empty string.');
        }

        const selectedTone = tone || this.defaultTone;

        return {
            content: text,
            tone: selectedTone,
            createdAt: new Date().toISOString()
        };
    }

    /**
     * Validates the utterance before it can be processed or spoken.
     * @param {Object} utterance - The utterance object to validate.
     * @throws {Error} - Throws an error if validation fails.
     */
    validateUtterance(utterance) {
        if (!utterance.content || typeof utterance.content !== 'string') {
            throw new Error('Invalid utterance content.');
        }
        if (!utterance.tone || typeof utterance.tone !== 'string') {
            throw new Error('Invalid tone for utterance.');
        }
    }
}

module.exports = UtteranceBuilder;
