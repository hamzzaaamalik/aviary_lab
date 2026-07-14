/**
 * Loop class to manage the perceive→think→act cycle of PROTO.
 * This class coordinates the execution of the perception, reasoning, and action phases.
 */
class Loop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
    }

    /**
     * Start the loop, initializing the cycle.
     * @param {number} interval - The interval in milliseconds for loop execution.
     */
    start(interval) {
        this.interval = interval;
        this.loop();
    }

    /**
     * Main loop function, scheduled to run at defined intervals.
     */
    async loop() {
        while (true) {
            const perceptionData = await this.perceive();
            const reasoningResult = this.think(perceptionData);
            this.act(reasoningResult);
            await this.sleep(this.interval);
        }
    }

    /**
     * Execute the perceive phase, getting data from perception modules.
     * @returns {Promise<Object>} - The perceived data.
     */
    async perceive() {
        return this.moduleRegistry.get('InputAdapter').getInput();
    }

    /**
     * Execute the think phase, using reasoning modules to process input.
     * @param {Object} input - The input data from the perceive phase.
     * @returns {Object} - The result of reasoning.
     */
    think(input) {
        const decisionMaker = this.moduleRegistry.get('DecisionMaker');
        return decisionMaker.makeDecision(input);
    }

    /**
     * Execute the act phase, using action modules to carry out decisions.
     * @param {Object} action - The action derived from the think phase.
     */
    act(action) {
        const actionModule = this.moduleRegistry.get(action.module);
        actionModule.execute(action);
    }

    /**
     * Sleep for a specified interval.
     * @param {number} ms - The duration to sleep in milliseconds.
     * @returns {Promise<void>} - A promise that resolves after the duration.
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Loop;