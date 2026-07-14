/**
 * EventIngestionPipeline.js
 * This module is responsible for ingesting events and processing signals
 * through the SignalParser. It orchestrates the flow of data and ensures
 * that events are properly parsed into percepts.
 *
 * @module EventIngestionPipeline
 */

const SignalParser = require('./SignalParser');
const EventBus = require('../../kernel/EventBus');

/**
 * Class representing an Event Ingestion Pipeline.
 */
class EventIngestionPipeline {
    constructor() {
        this.eventBus = new EventBus();
        this.signalParser = new SignalParser();
    }

    /**
     * Initializes the pipeline and sets up event listeners.
     * @returns {void}
     */
    initialize() {
        this.eventBus.on('eventReceived', this.processEvent.bind(this));
    }

    /**
     * Processes incoming events and passes them to the signal parser.
     * @param {Object} event - The event to process.
     * @returns {void}
     */
    processEvent(event) {
        try {
            const signals = this.extractSignals(event);
            const percepts = this.signalParser.parse(signals);
            this.handlePercepts(percepts);
        } catch (error) {
            console.error('Error processing event:', error);
        }
    }

    /**
     * Extracts signals from the event object.
     * @param {Object} event - The event object containing signal data.
     * @returns {Array} - Array of signals extracted from the event.
     */
    extractSignals(event) {
        // Assuming event has a `signals` property
        if (!event.signals || !Array.isArray(event.signals)) {
            throw new Error('Invalid event: signals are missing or not an array.');
        }
        return event.signals;
    }

    /**
     * Handles the parsed percepts (to be implemented in future).
     * @param {Array} percepts - The percepts obtained from the signal parser.
     * @returns {void}
     */
    handlePercepts(percepts) {
        // Placeholder for handling percepts
        console.log('Percepts received:', percepts);
    }
}

module.exports = EventIngestionPipeline;
