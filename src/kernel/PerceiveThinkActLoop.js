/**
 * The PerceiveThinkActLoop class coordinates the loop of perception, reasoning, and action.
 * @class
 */
class PerceiveThinkActLoop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
        this.isRunning = false;
    }

    /**
     * Starts the loop.
     * @returns {void}
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    }

    /**
     * Stops the loop.
     * @returns {void}
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * The main loop that handles perception, reasoning, and action.
     * @returns {void}
     */
    loop() {
        if (!this.isRunning) return;

        // Perception phase
        const perceptionModule = this.moduleRegistry.get('perception');
        const perceptions = perceptionModule.processInput();

        // Reasoning phase
        const reasoningModule = this.moduleRegistry.get('reasoning');
        const decisions = reasoningModule.makeDecisions(perceptions);

        // Action phase
        const actionModule = this.moduleRegistry.get('action');
        actionModule.performActions(decisions);

        // Schedule the next iteration
        setImmediate(() => this.loop());
    }
}

module.exports = PerceiveThinkActLoop;