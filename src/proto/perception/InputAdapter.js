/**
 * InputAdapter class for handling and processing different input signals.
 * This module serves as an interface for various input sources and
 * translates raw input into a structured percept format.
 *
 * @class InputAdapter
 */
class InputAdapter {
    constructor() {
        this.inputSources = new Map();
    }

    /**
     * Registers a new input source.
     * @param {string} sourceId - Unique identifier for the input source.
     * @param {Function} handler - Function to process the input from this source.
     */
    registerSource(sourceId, handler) {
        if (this.inputSources.has(sourceId)) {
            throw new Error(`Input source ${sourceId} is already registered.`);
        }
        this.inputSources.set(sourceId, handler);
    }

    /**
     * Unregisters an existing input source.
     * @param {string} sourceId - Unique identifier for the input source.
     */
    unregisterSource(sourceId) {
        if (!this.inputSources.has(sourceId)) {
            throw new Error(`Input source ${sourceId} does not exist.`);
        }
        this.inputSources.delete(sourceId);
    }

    /**
     * Processes input from registered sources and transforms it into
     * percepts, then emits an event for further processing.
     * @param {string} sourceId - Unique identifier for the input source.
     * @param {any} rawInput - The raw input data from the source.
     */
    processInput(sourceId, rawInput) {
        if (!this.inputSources.has(sourceId)) {
            throw new Error(`Input source ${sourceId} is not registered.`);
        }
        const handler = this.inputSources.get(sourceId);
        const percept = handler(rawInput);

        // Emit an event for further processing
        this.emitPercept(percept);
    }

    /**
     * Emits a percept for further processing by other modules.
     * @param {object} percept - The percept object to emit.
     */
    emitPercept(percept) {
        // Placeholder for event emission logic
        // This would typically interact with the EventBus or similar
        console.log('Emitting percept:', percept);
    }
}

export default InputAdapter;
