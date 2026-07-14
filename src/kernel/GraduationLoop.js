/**
 * GraduationLoop - Main execution loop for PROTO's graduation process.
 * Handles the orchestration of perception, reasoning, and action.
 *
 * @module GraduationLoop
 */

const GraduationManager = require('./GraduationManager');
const GraduationProcessor = require('./GraduationProcessor');
const PerceiveThinkActLoop = require('./PerceiveThinkActLoop');

class GraduationLoop {
    constructor() {
        this.manager = new GraduationManager();
        this.processor = new GraduationProcessor();
    }

    /**
     * Initializes the Graduation process.
     */
    init() {
        this.manager.initialize();
        this.processor.initialize();
    }

    /**
     * Main loop method. Runs the perception, reasoning, and action cycle.
     * @returns {void}
     */
    run() {
        this.init();
        setInterval(() => {
            const perceptionData = this.manager.getPerceptionData();
            const reasoningOutput = this.processor.process(perceptionData);
            this.manager.executeActions(reasoningOutput);
        }, 100); // 10 Hz loop
    }

    /**
     * Stops the Graduation loop.
     */
    stop() {
        clearInterval(this.run);
    }
}

module.exports = GraduationLoop;
