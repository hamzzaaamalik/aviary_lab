/**
 * ToneSynthesis class for generating personality-infused tonal variations.
 * This class extends existing tonal outputs by incorporating personality traits,
 * allowing for a more nuanced voice output.
 */
class ToneSynthesis {
    /**
     * Constructor for ToneSynthesis.
     * @param {Object} personalityTraits - An object containing personality traits.
     */
    constructor(personalityTraits) {
        this.personalityTraits = personalityTraits || {};
    }

    /**
     * Generates a tonal variation based on input text and personality traits.
     * @param {string} inputText - The text to be synthesized.
     * @returns {string} - The synthesized tonal output.
     */
    synthesize(inputText) {
        const baseTone = this.getBaseTone(inputText);
        return this.applyPersonality(baseTone);
    }

    /**
     * Determines the base tone based on the input text.
     * @param {string} inputText - The text to analyze.
     * @returns {string} - The determined base tone.
     */
    getBaseTone(inputText) {
        // Simple analysis to determine base tone, can be extended.
        if (inputText.includes('?')) {
            return 'curious';
        } else if (inputText.includes('!')) {
            return 'excited';
        }
        return 'neutral';
    }

    /**
     * Applies personality traits to the determined tone.
     * @param {string} baseTone - The base tone to enhance.
     * @returns {string} - Enhanced tonal output with personality traits.
     */
    applyPersonality(baseTone) {
        const traits = Object.keys(this.personalityTraits);
        if (traits.includes('assertive')) {
            return `assertively ${baseTone}`;
        } else if (traits.includes('empathetic')) {
            return `empathetically ${baseTone}`;
        }
        return baseTone;
    }
}

module.exports = ToneSynthesis;