/**
 * PerceptionLoop.js
 * This module orchestrates the perception phase of PROTO's loop.
 * It integrates inputs from the InputAdapter and feeds it into the reasoning module.
 * @module PerceptionLoop
 */

const InputAdapter = require('../proto/perception/InputAdapter');
const DecisionMaker = require('../proto/reasoning/DecisionMaker');

/**
 * Class representing the perception loop of PROTO.
 */
class PerceptionLoop {
    constructor() {
        this.inputAdapter = new InputAdapter();
        this.decisionMaker = new DecisionMaker();
    }

    /**
     * Runs the perception cycle, acquiring inputs and making decisions.
     * @returns {void}
     */
    run() {
        try {
            // Step 1: Acquire inputs from the environment
            const inputs = this.inputAdapter.acquireInputs();
            
            // Step 2: Process inputs through reasoning
            const decisions = this.decisionMaker.makeDecision(inputs);
            
            // Output decisions for further action
            console.log('Decisions made:', decisions);
        } catch (error) {
            console.error('Error in PerceptionLoop:', error);
        }
    }
}

module.exports = PerceptionLoop;
