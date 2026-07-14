// GraduationLoop.js

/**
 * The GraduationLoop orchestrates the perceive-think-act cycle for PROTO.
 * It integrates perception, reasoning, and action to create a cohesive response.
 */
class GraduationLoop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
        this.isRunning = false;
    }

    /**
     * Starts the loop, initializing necessary modules and setting up event listeners.
     */
    start() {
        this.isRunning = true;
        this.initializeModules();
        this.eventBus.subscribe('PERCEPTION_EVENT', this.handlePerception.bind(this));
        this.eventBus.subscribe('ACTION_EVENT', this.handleAction.bind(this));
        this.run();
    }

    /**
     * Stops the loop, cleaning up resources and unsubscribing from events.
     */
    stop() {
        this.isRunning = false;
        this.eventBus.unsubscribe('PERCEPTION_EVENT', this.handlePerception.bind(this));
        this.eventBus.unsubscribe('ACTION_EVENT', this.handleAction.bind(this));
    }

    /**
     * Initializes perception, reasoning, and action modules.
     */
    initializeModules() {
        // Assume modules are registered in the ModuleRegistry
        this.perceptionModule = this.moduleRegistry.getModule('Perception');
        this.reasoningModule = this.moduleRegistry.getModule('Reasoning');
        this.actionModule = this.moduleRegistry.getModule('Action');
    }

    /**
     * The main loop that executes the perceive-think-act cycle.
     */
    run() {
        if (!this.isRunning) return;
        // Perception phase
        const signals = this.perceptionModule.perceive();
        // Reasoning phase
        const decisions = this.reasoningModule.think(signals);
        // Action phase
        this.actionModule.act(decisions);

        // Schedule next iteration
        setImmediate(() => this.run());
    }

    /**
     * Handles perception events from the event bus.
     * @param {Object} event - The event object containing perception data.
     */
    handlePerception(event) {
        // Process the perception event
        this.perceptionModule.processEvent(event);
    }

    /**
     * Handles action events from the event bus.
     * @param {Object} action - The action object to be executed.
     */
    handleAction(action) {
        this.actionModule.execute(action);
    }
}

module.exports = GraduationLoop;