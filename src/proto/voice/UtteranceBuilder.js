/**
 * UtteranceBuilder - A utility to construct dynamic utterances for PROTO's voice.
 *
 * This module helps in generating context-aware utterances by combining various elements
 * of language, such as tone, persona, and content.
 *
 * @module UtteranceBuilder
 */

class UtteranceBuilder {
    /**
     * Create an instance of UtteranceBuilder.
     * @param {Object} persona - The persona characteristics to shape the voice.
     * @param {string} context - The context in which the utterance is made.
     */
    constructor(persona, context) {
        this.persona = persona;
        this.context = context;
    }

    /**
     * Generate a dynamic utterance based on the persona and context.
     * @param {string} baseMessage - The base message to start the utterance.
     * @returns {string} - The constructed utterance.
     */
    generateUtterance(baseMessage) {
        const tone = this.getTone();
        const enrichedMessage = this.enrichMessage(baseMessage);
        return `${tone} ${enrichedMessage}`;
    }

    /**
     * Determine the tone of the utterance based on the persona.
     * @returns {string} - The selected tone for the utterance.
     */
    getTone() {
        // Simple tone selection logic based on persona
        if (this.persona.isFriendly) {
            return "Hey there!";
        } else if (this.persona.isProfessional) {
            return "Good day:";
        }
        return "";
    }

    /**
     * Enrich the base message with additional contextual information.
     * @param {string} message - The base message to enrich.
     * @returns {string} - The enriched message.
     */
    enrichMessage(message) {
        // Simple enrichment logic based on context
        if (this.context === 'greeting') {
            return `${message}, hope you're having a great day!`;
        } else if (this.context === 'farewell') {
            return `${message}, take care!`;
        }
        return message;
    }
}

module.exports = UtteranceBuilder;
