/**
 * @module PerceptionProcessor
 * @description Processes incoming signals from the EventBus and routes them to the appropriate perception modules.
 */

const EventBus = require('./EventBus');
const EventIngestionPipeline = require('../proto/perception/EventIngestionPipeline');
const SignalParser = require('../proto/perception/SignalParser');

class PerceptionProcessor {
    constructor() {
        this.eventBus = new EventBus();
        this.eventIngestionPipeline = new EventIngestionPipeline();
        this.signalParser = new SignalParser();
        this.eventBus.subscribe(this.handleEvent.bind(this));
    }

    /**
     * Handles incoming events from the EventBus.
     * @param {Object} event - The event object received from the EventBus.
     */
    handleEvent(event) {
        try {
            const rawSignal = event.data;
            const parsedSignal = this.signalParser.parse(rawSignal);
            this.eventIngestionPipeline.process(parsedSignal);
        } catch (error) {
            console.error('Error processing event:', error);
        }
    }
}

module.exports = PerceptionProcessor;
