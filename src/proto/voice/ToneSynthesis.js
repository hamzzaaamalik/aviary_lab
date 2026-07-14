/**
 * ToneSynthesis.js
 * This module synthesizes tone based on context and personality traits.
 * It leverages the Personality model to create varied tones for utterances.
 */

class ToneSynthesis {
    constructor(personality) {
        /**
         * @type {Personality}
         */
        this.personality = personality;
    }

    /**
     * Generate a tone based on the personality and given context.
     * @param {string} context - The context for the tone generation (e.g., "greeting", "response").
     * @returns {string} - Generated tone.
     */
    generateTone(context) {
        const toneMap = {
            greeting: this._greetingTone(),
            response: this._responseTone(),
            farewell: this._farewellTone()
        };

        return toneMap[context] || this._defaultTone();
    }

    /**
     * Private method to create a greeting tone.
     * @returns {string} - Greeting tone based on personality.
     */
    _greetingTone() {
        const traits = this.personality.getTraits();
        return traits.includes('friendly') ? "Hey there!" : "Greetings.";
    }

    /**
     * Private method to create a response tone.
     * @returns {string} - Response tone based on personality.
     */
    _responseTone() {
        const traits = this.personality.getTraits();
        return traits.includes('sarcastic') ? "Oh, that's just brilliant..." : "I see what you mean.";
    }

    /**
     * Private method to create a farewell tone.
     * @returns {string} - Farewell tone based on personality.
     */
    _farewellTone() {
        const traits = this.personality.getTraits();
        return traits.includes('cheerful') ? "Catch you later!" : "Until next time.";
    }

    /**
     * Default tone if context is not matched.
     * @returns {string} - Default tone.
     */
    _defaultTone() {
        return "Hmm, I don't have a tone for that.";
    }
}

export default ToneSynthesis;