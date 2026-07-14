/**
 * SignalParser is responsible for interpreting raw signal data and converting it into structured percepts.
 * It extracts useful information from the signals based on predefined patterns and formats.
 */
class SignalParser {
    /**
     * Constructs a SignalParser instance.
     */
    constructor() {
        this.signalPatterns = [];
    }

    /**
     * Adds a new signal pattern to the parser.
     * @param {RegExp} pattern - The regex pattern for identifying the signal format.
     * @param {function} handler - The function to handle the parsed result.
     */
    addPattern(pattern, handler) {
        this.signalPatterns.push({ pattern, handler });
    }

    /**
     * Parses a raw signal string and returns structured percepts.
     * @param {string} rawSignal - The unstructured signal data.
     * @returns {Array} An array of percepts derived from the raw signal.
     */
    parse(rawSignal) {
        const percepts = [];
        for (const { pattern, handler } of this.signalPatterns) {
            const matches = rawSignal.match(pattern);
            if (matches) {
                const percept = handler(matches);
                percepts.push(percept);
            }
        }
        return percepts;
    }
}

// Example usage of SignalParser class
const parser = new SignalParser();

// Define a pattern for a hypothetical signal
parser.addPattern(/temp: (\d+)/, (matches) => ({ type: 'temperature', value: parseInt(matches[1], 10) }));
parser.addPattern(/hum: (\d+)/, (matches) => ({ type: 'humidity', value: parseInt(matches[1], 10) }));

// This function simulates receiving a raw signal and parsing it.
function simulateSignalReception(signal) {
    const percepts = parser.parse(signal);
    console.log('Parsed Percepts:', percepts);
}

// Simulating a raw signal reception
simulateSignalReception('temp: 25 hum: 70');

export default SignalParser;