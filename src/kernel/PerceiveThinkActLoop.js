/**
 * PerceiveThinkActLoop handles the core loop of PROTO, integrating perception, reasoning, and action.
 * This implementation ensures the modules communicate effectively to achieve coherent behavior.
 *
 * @class PerceiveThinkActLoop
 */
class PerceiveThinkActLoop {
    constructor(perceptionProcessor, reasoningBridge, actionManager) {
        /**
         * @type {PerceptionProcessor}
         */
        this.perceptionProcessor = perceptionProcessor;
        /**
         * @type {PerceptionReasoningBridge}
         */
        this.reasoningBridge = reasoningBridge;
        /**
         * @type {GraduationManager}
         */
        this.actionManager = actionManager;
        this.running = false;
    }

    /**
     * Starts the perception-think-act loop.
     */
    startLoop() {
        this.running = true;
        this.loop();
    }

    /**
     * Stops the perception-think-act loop.
     */
    stopLoop() {
        this.running = false;
    }

    /**
     * Core loop function that executes the perceive, think, and act phases.
     */
    loop() {
        if (!this.running) return;

        // Perception phase
        const signals = this.perceptionProcessor.processSignals();
        // Reasoning phase
        const decisions = this.reasoningBridge.evaluate(signals);
        // Action phase
        this.actionManager.execute(decisions);

        // Continue the loop
        setImmediate(() => this.loop());
    }
}

module.exports = PerceiveThinkActLoop;
