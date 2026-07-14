/**
 * GraduationLoop: orchestrates the core loop of PROTO
 * by managing the sequence of perception, reasoning, and action.
 */
class GraduationLoop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
        this.running = false;
    }

    /**
     * Start the main loop of PROTO.
     */
    start() {
        this.running = true;
        this.run();
    }

    /**
     * Stop the main loop of PROTO.
     */
    stop() {
        this.running = false;
    }

    /**
     * Main execution loop that coordinates perception, reasoning, and action.
     * @private
     */
    run() {
        if (!this.running) return;

        // Step 1: Perception
        const perceptionModule = this.moduleRegistry.getModule('perception');
        const signals = perceptionModule.processSignals();

        // Step 2: Reasoning
        const reasoningModule = this.moduleRegistry.getModule('reasoning');
        const decisions = reasoningModule.makeDecisions(signals);

        // Step 3: Action
        const actionModule = this.moduleRegistry.getModule('action');
        actionModule.executeActions(decisions);

        // Schedule next loop iteration
        setImmediate(() => this.run());
    }
}

export default GraduationLoop;