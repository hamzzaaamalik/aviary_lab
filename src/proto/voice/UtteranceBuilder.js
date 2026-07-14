/**
 * UtteranceBuilder class for constructing coherent and context-aware utterances.
 *
 * It integrates tone, personality, and intent to create natural language outputs.
 */
class UtteranceBuilder {
    constructor() {
        this.utterance = '';
        this.personality = null;
        this.tone = null;
    }

    /**
     * Set the personality for the utterance.
     * @param {Personality} personality - The personality model to use.
     */
    setPersonality(personality) {
        if (!(personality instanceof Personality)) {
            throw new Error('Invalid personality model.');
        }
        this.personality = personality;
    }

    /**
     * Set the tone for the utterance.
     * @param {ToneSynthesis} tone - The tone model to use.
     */
    setTone(tone) {
        if (!(tone instanceof ToneSynthesis)) {
            throw new Error('Invalid tone model.');
        }
        this.tone = tone;
    }

    /**
     * Build an utterance based on the provided input and context.
     * @param {string} input - Raw input or prompt for the utterance.
     * @param {Object} context - Additional context for tailoring the utterance.
     * @returns {string} - The constructed utterance.
     */
    buildUtterance(input, context) {
        if (!input || typeof input !== 'string') {
            throw new Error('Invalid input for utterance.');
        }
        this.utterance = this.constructBaseUtterance(input, context);
        if (this.tone) {
            this.utterance = this.tone.applyTone(this.utterance);
        }
        if (this.personality) {
            this.utterance = this.personality.applyPersonality(this.utterance);
        }
        return this.utterance;
    }

    /**
     * Constructs the base utterance from the input and context.
     * @private
     * @param {string} input - The raw input string.
     * @param {Object} context - Contextual information.
     * @returns {string} - The base utterance string.
     */
    constructBaseUtterance(input, context) {
        // Placeholder for constructing the utterance. Implement logic based on context.
        return `${context.prefix || ''}${input}${context.suffix || ''}`;
    }
}

export default UtteranceBuilder;