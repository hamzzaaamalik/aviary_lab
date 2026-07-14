/**
 * PerceptionProcessor - A module responsible for processing incoming sensory signals
 * and transforming them into internal representations suitable for reasoning and action.
 *
 * @module PerceptionProcessor
 */

class PerceptionProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.signals = [];
        this.signalParser = new SignalParser();
        this.eventBus.subscribe('newSignal', this.handleNewSignal.bind(this));
    }

    /**
     * handleNewSignal - Receives new signals and processes them.
     * @param {Object} signal - The incoming signal to process.
     */
    handleNewSignal(signal) {
        const parsedSignal = this.signalParser.parse(signal);
        this.signals.push(parsedSignal);
        this.processSignals();
    }

    /**
     * processSignals - Converts signals into actionable perceptions and triggers reasoning.
     */
    processSignals() {
        const perceptions = this.createPerceptions(this.signals);
        this.eventBus.publish('perceptionsReady', perceptions);
    }

    /**
     * createPerceptions - Creates internal perceptions from the collected signals.
     * @param {Array} signals - Array of parsed signals.
     * @returns {Array} - An array of created perceptions.
     */
    createPerceptions(signals) {
        return signals.map(signal => {
            // Transform signal into a perception object, can add more complexity here
            return { id: signal.id, type: signal.type, timestamp: signal.timestamp, data: signal.data };
        });
    }
}

// Exporting the PerceptionProcessor module
module.exports = PerceptionProcessor;