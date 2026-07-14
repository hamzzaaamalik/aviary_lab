/**
 * PerceiveThinkActLoop manages the primary operational cycle of PROTO.
 * It orchestrates the perception, reasoning, and action modules in a continuous loop.
 */
class PerceiveThinkActLoop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
        this.running = false;
    }

    /**
     * Starts the operational loop, invoking perception, reasoning, and action in a cycle.
     */
    start() {
        this.running = true;
        this.loop();
    }

    /**
     * Stops the operational loop.
     */
    stop() {
        this.running = false;
    }

    /**
     * The main loop that executes the perception, reasoning, and action sequence.
     * @private
     */
    loop() {
        if (!this.running) return;

        // Execute perception
        const perceptionModule = this.moduleRegistry.get('perception');
        perceptionModule.perceive();

        // Execute reasoning
        const reasoningModule = this.moduleRegistry.get('reasoning');
        reasoningModule.reason();

        // Execute action
        const actionModule = this.moduleRegistry.get('action');
        actionModule.act();

        // Schedule the next cycle
        setImmediate(() => this.loop());
    }
}

module.exports = PerceiveThinkActLoop;