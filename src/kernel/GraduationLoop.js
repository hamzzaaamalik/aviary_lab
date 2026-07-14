/**
 * GraduationLoop orchestrates the perceive → think → act cycle.
 * It leverages the EventBus for inter-module communication and manages
 * the execution of the perception, reasoning, and action modules.
 */
class GraduationLoop {
    constructor(eventBus, perception, reasoning, action) {
        this.eventBus = eventBus;
        this.perception = perception;
        this.reasoning = reasoning;
        this.action = action;
        this.isRunning = false;
    }

    /**
     * Starts the Graduation Loop.
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.run();
    }

    /**
     * Stops the Graduation Loop.
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * Main loop function that orchestrates the perceive → think → act cycle.
     */
    run() {
        if (!this.isRunning) return;

        // Step 1: Perceive
        const perceptionData = this.perception.process();
        this.eventBus.emit('perceptionData', perceptionData);

        // Step 2: Think
        const reasoningOutput = this.reasoning.process(perceptionData);
        this.eventBus.emit('reasoningOutput', reasoningOutput);

        // Step 3: Act
        this.action.execute(reasoningOutput);

        // Schedule the next run
        setImmediate(() => this.run());
    }
}

module.exports = GraduationLoop;
