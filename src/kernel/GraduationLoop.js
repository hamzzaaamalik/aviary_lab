/**
 * GraduationLoop orchestrates the primary loop of PROTO, integrating perception, reasoning, and action.
 * This class handles the lifecycle of the system, ensuring each module communicates effectively.
 */
class GraduationLoop {
    constructor(perceptionManager, eventManager, decisionMaker) {
        this.perceptionManager = perceptionManager;
        this.eventManager = eventManager;
        this.decisionMaker = decisionMaker;
        this.isRunning = false;
    }

    /**
     * Start the loop.
     * @returns {void}
     */
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }

    /**
     * Stop the loop.
     * @returns {void}
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * Main loop function. Continuously processes perception, reasoning and actions.
     * @private
     * @returns {void}
     */
    loop() {
        if (!this.isRunning) return;

        try {
            const inputs = this.perceptionManager.getInputs();
            const decisions = this.decisionMaker.makeDecisions(inputs);
            this.eventManager.dispatchEvents(decisions);
        } catch (error) {
            console.error('Error during loop execution:', error);
        }

        // Schedule the next cycle of the loop
        requestAnimationFrame(this.loop.bind(this));
    }
}

export default GraduationLoop;