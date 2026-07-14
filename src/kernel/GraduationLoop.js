/**
 * GraduationLoop.js
 *
 * This module is responsible for managing the overall loop that runs PROTO's core
 * functions, integrating perception, reasoning, and action. It calls the necessary
 * methods from each module, ensuring smooth transitions and timely responses.
 *
 * @module GraduationLoop
 */

const PerceptionManager = require('./PerceptionManager');
const DecisionMaker = require('../proto/reasoning/DecisionMaker');
const Personality = require('../proto/voice/Personality');
const UtteranceBuilder = require('../proto/voice/UtteranceBuilder');

/**
 * GraduationLoop class to oversee the main operation of PROTO.
 */
class GraduationLoop {
    constructor() {
        this.perceptionManager = new PerceptionManager();
        this.decisionMaker = new DecisionMaker();
        this.personality = new Personality();
        this.utteranceBuilder = new UtteranceBuilder();
        this.running = false;
    }

    /**
     * Start the GraduationLoop.
     */
    start() {
        this.running = true;
        this.loop();
    }

    /**
     * Main loop that integrates perception, reasoning, and action.
     */
    loop() {
        if (!this.running) return;

        const input = this.perceptionManager.perceive();
        const decision = this.decisionMaker.makeDecision(input);
        const response = this.utteranceBuilder.buildUtterance(decision);

        this.personality.speak(response);

        // Schedule next loop iteration
        setTimeout(() => this.loop(), 100); // Adjust the interval as needed
    }

    /**
     * Stop the GraduationLoop.
     */
    stop() {
        this.running = false;
    }
}

module.exports = GraduationLoop;

/**
 * Additional utility functions can be added here if necessary.
 */