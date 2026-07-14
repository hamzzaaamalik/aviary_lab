/**
 * GraduationLoop.js
 * This module orchestrates the perceive-think-act loop by integrating the perception and reasoning modules.
 * It ensures that PROTO can process inputs and generate outputs in a cohesive manner.
 */

const EventBus = require('./EventBus');
const ModuleRegistry = require('./ModuleRegistry');
const PerceptionReasoningBridge = require('./PerceptionReasoningBridge');

/**
 * GraduationLoop class handles the main loop for PROTO, connecting perception with reasoning and action.
 */
class GraduationLoop {
    constructor() {
        this.eventBus = new EventBus();
        this.modules = ModuleRegistry.getModules();
        this.perceptionReasoningBridge = new PerceptionReasoningBridge(this.eventBus);
    }

    /**
     * Initializes the loop by setting up event listeners and starting the loop.
     */
    init() {
        this.setupEventListeners();
        this.startLoop();
    }

    /**
     * Sets up event listeners for the different modules.
     */
    setupEventListeners() {
        this.eventBus.on('signalReceived', signal => this.handleSignal(signal));
    }

    /**
     * The main loop that continuously processes signals and invokes reasoning.
     */
    startLoop() {
        setInterval(() => {
            this.perceptionReasoningBridge.process();
        }, 100); // Process every 100ms
    }

    /**
     * Handles the received signal and triggers the reasoning process.
     * @param {Object} signal - The incoming signal from perception.
     */
    handleSignal(signal) {
        // Here you could validate the signal and pass it to the reasoning module
        this.perceptionReasoningBridge.sendToReasoning(signal);
    }
}

module.exports = GraduationLoop;
