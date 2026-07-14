/**
 * PerceptionMemoryBridge.js
 * 
 * Bridges the Perception Processor and Long Term Memory for real-time contextual awareness. This module retrieves relevant memories based on current perceptions to inform decision-making.
 * 
 * @module PerceptionMemoryBridge
 */

const LongTermMemory = require("../proto/memory/LongTermMemory");
const PerceptionProcessor = require("./PerceptionProcessor");

/**
 * Class representing the Perception Memory Bridge.
 */
class PerceptionMemoryBridge {
    constructor() {
        this.memory = new LongTermMemory();
        this.perceptionProcessor = new PerceptionProcessor();
    }

    /**
     * Retrieves relevant memories based on the current perception input.
     * @param {Object} perceptionData - The data from the perception processor.
     * @returns {Array} - Array of relevant memories.
     */
    retrieveRelevantMemories(perceptionData) {
        const context = this.extractContext(perceptionData);
        return this.memory.retrieve(context);
    }

    /**
     * Extracts contextual information from perception data.
     * @param {Object} perceptionData - The data from the perception processor.
     * @returns {Object} - Contextual details.
     */
    extractContext(perceptionData) {
        // Implement context extraction logic from perception data.
        return {
            type: perceptionData.type,
            timestamp: perceptionData.timestamp,
            environment: perceptionData.environment
        };
    }

    /**
     * Processes incoming perception data and retrieves memories.
     * @param {Object} perceptionData - The data from the perception processor.
     * @returns {Array} - Array of relevant memories.
     */
    process(perceptionData) {
        this.perceptionProcessor.process(perceptionData);
        return this.retrieveRelevantMemories(perceptionData);
    }
}

module.exports = PerceptionMemoryBridge;
