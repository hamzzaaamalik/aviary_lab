/**
 * GraduationLoop manages the core loop for PROTO's self-awareness and decision-making.
 * It orchestrates perception, reasoning, and action, ensuring a continuous flow of information.
 * 
 * @module GraduationLoop
 */

class GraduationLoop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
        this.running = false;
    }

    /**
     * Starts the graduation loop.
     * This will continuously run until stopped, processing perception, reasoning, and action phases.
     */
    start() {
        if (this.running) {
            console.warn('GraduationLoop is already running.');
            return;
        }
        this.running = true;
        this.loop();
    }

    /**
     * Stops the graduation loop.
     */
    stop() {
        this.running = false;
    }

    /**
     * Main loop that executes perception, reasoning, and action.
     */
    loop() {
        if (!this.running) return;

        try {
            this.perceive();
            this.reason();
            this.act();
        } catch (error) {
            console.error('Error in graduation loop:', error);
        }

        // Schedule next iteration
        setImmediate(() => this.loop());
    }

    /**
     * Handles perception by gathering inputs from various sources.
     */
    perceive() {
        // Assuming EventIngestionPipeline handles signal ingestion.
        const inputs = this.moduleRegistry.getModule('EventIngestionPipeline').process();
        this.eventBus.emit('perception:inputs', inputs);
    }

    /**
     * Handles reasoning by processing the gathered inputs and making decisions.
     */
    reason() {
        const inputs = this.eventBus.getData('perception:inputs');
        const decisionPolicy = this.moduleRegistry.getModule('DecisionPolicy');
        decisionPolicy.evaluate(inputs);
    }

    /**
     * Handles actions based on the reasoning phase decisions.
     */
    act() {
        const actions = this.eventBus.getData('reasoning:decisions');
        const actionExecutor = this.moduleRegistry.getModule('ActionExecutor');
        actionExecutor.execute(actions);
    }
}

module.exports = GraduationLoop;
