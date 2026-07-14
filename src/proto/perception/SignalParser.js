/**
 * SignalParser class processes incoming signals and extracts percepts.
 * It validates and categorizes signals based on predefined rules.
 */
class SignalParser {
    constructor() {
        // Define signal types and their respective handlers
        this.signalHandlers = {
            'typeA': this.handleTypeA,
            'typeB': this.handleTypeB,
            // Add more types as needed
        };
    }

    /**
     * Parse an incoming signal.
     * @param {Object} signal - The incoming signal object.
     * @returns {Object} - Parsed percept or null if invalid.
     */
    parse(signal) {
        if (!this.validateSignal(signal)) {
            console.error('Invalid signal:', signal);
            return null;
        }

        const handler = this.signalHandlers[signal.type];
        if (handler) {
            return handler.call(this, signal);
        }

        console.warn('No handler for signal type:', signal.type);
        return null;
    }

    /**
     * Validate the structure of the incoming signal.
     * @param {Object} signal - The signal to validate.
     * @returns {boolean} - True if valid, otherwise false.
     */
    validateSignal(signal) {
        return signal && typeof signal.type === 'string' && this.signalHandlers.hasOwnProperty(signal.type);
    }

    /**
     * Handle typeA signals.
     * @param {Object} signal - The signal object to handle.
     * @returns {Object} - Processed percept.
     */
    handleTypeA(signal) {
        // Logic for handling typeA signals
        return { perceptType: 'PerceptA', data: signal.data };
    }

    /**
     * Handle typeB signals.
     * @param {Object} signal - The signal object to handle.
     * @returns {Object} - Processed percept.
     */
    handleTypeB(signal) {
        // Logic for handling typeB signals
        return { perceptType: 'PerceptB', data: signal.data };
    }
}

module.exports = SignalParser;