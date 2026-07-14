/**
 * GraduationLoop - orchestrates the loop of perception, reasoning, and action for PROTO.
 * @module GraduationLoop
 */

class GraduationLoop {
    constructor(perceptionProcessor, reasoningBridge, stateManager) {
        this.perceptionProcessor = perceptionProcessor;
        this.reasoningBridge = reasoningBridge;
        this.stateManager = stateManager;
        this.isRunning = false;
    }

    /**
     * Starts the Graduation loop, invoking the perceive → think → act cycle.
     */
    start() {
        this.isRunning = true;
        this.loop();
    }

    /**
     * Stops the Graduation loop.
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * The main loop that processes perception, reasoning, and actions.
     * @private
     */
    loop() {
        if (this.isRunning) {
            this.perceive();
            this.think();
            this.act();
            requestAnimationFrame(() => this.loop());
        }
    }

    /**
     * Processes incoming signals through the perception pipeline.
     */
    perceive() {
        const signals = this.perceptionProcessor.processSignals();
        this.stateManager.updatePerception(signals);
    }

    /**
     * Executes reasoning based on the current state and perceived inputs.
     */
    think() {
        const currentState = this.stateManager.getCurrentState();
        const decisions = this.reasoningBridge.generateDecisions(currentState);
        this.stateManager.updateDecisions(decisions);
    }

    /**
     * Acts upon the decisions made during the reasoning phase.
     */
    act() {
        const actions = this.stateManager.getActions();
        actions.forEach(action => this.executeAction(action));
    }

    /**
     * Executes a single action.
     * @param {Object} action - The action to be executed.
     * @private
     */
    executeAction(action) {
        // Placeholder for action execution logic.
        console.log('Executing action:', action);
    }
}

export default GraduationLoop;