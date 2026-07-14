/**
 * WorldOrchestrator orchestrates the interaction between the various modules of the world.
 * It manages the execution loop, integrating perception, memory, and reasoning modules.
 *
 * @module WorldOrchestrator
 */

const PerceiveThinkActLoop = require('./PerceiveThinkActLoop');
const PerformanceMonitor = require('./PerformanceMonitor');
const StateManager = require('./StateManager');
const MemoryManager = require('../proto/memory/MemoryManager');
const DecisionPolicy = require('../proto/reasoning/DecisionPolicy');

class WorldOrchestrator {
    constructor() {
        this.performanceMonitor = new PerformanceMonitor();
        this.stateManager = new StateManager();
        this.memoryManager = new MemoryManager();
        this.decisionPolicy = new DecisionPolicy();
        this.loop = new PerceiveThinkActLoop(this);
    }

    /**
     * Start the orchestration loop.
     */
    start() {
        this.performanceMonitor.start();
        this.loop.execute();
    }

    /**
     * Stop the orchestration loop.
     */
    stop() {
        this.performanceMonitor.stop();
    }

    /**
     * Update the world state based on the current perception and memory.
     * @param {Object} perceptionData - The data received from the perception module.
     */
    updateState(perceptionData) {
        this.stateManager.update(perceptionData);
        this.memoryManager.store(perceptionData);
        this.decisionPolicy.evaluate(this.stateManager.getState());
    }

    /**
     * Get the current state of the world.
     * @returns {Object} The current state.
     */
    getCurrentState() {
        return this.stateManager.getState();
    }
}

module.exports = WorldOrchestrator;