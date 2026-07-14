/**
 * The PerceptionProcessor processes incoming signals and feeds them into the reasoning module.
 * It manages the pipeline from ingestion to meaningful action triggers.
 * @module PerceptionProcessor
 */

class PerceptionProcessor {
    constructor(eventBus, reasoningBridge) {
        this.eventBus = eventBus;  // Event bus for communication
        this.reasoningBridge = reasoningBridge; // Bridge to reasoning module
    }

    /**
     * Process a signal from the ingestion pipeline.
     * @param {Object} signal - The signal object to process.
     * @throws {Error} - Throws an error if the signal is invalid.
     */
    processSignal(signal) {
        this.validateSignal(signal);
        const processedSignal = this.transformSignal(signal);
        this.eventBus.publish('signal.processed', processedSignal);
        this.reasoningBridge.handleProcessedSignal(processedSignal);
    }

    /**
     * Validate the incoming signal.
     * @param {Object} signal - The signal object to validate.
     * @throws {Error} - Throws an error if validation fails.
     */
    validateSignal(signal) {
        if (!signal || typeof signal !== 'object') {
            throw new Error('Invalid signal: must be a non-null object.');
        }
        // Add more validation logic as necessary
    }

    /**
     * Transform the incoming signal into a more usable format.
     * @param {Object} signal - The signal object to transform.
     * @return {Object} - Transformed signal.
     */
    transformSignal(signal) {
        // Placeholder transformation logic (expand as needed)
        return {
            timestamp: Date.now(),
            content: signal.content,
            type: signal.type,
        };
    }
}

module.exports = PerceptionProcessor;