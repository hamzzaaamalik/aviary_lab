/**
 * GraduationExecutor.js
 * 
 * This module is responsible for managing the execution of the graduation process, orchestrating the
 * interactions between different components during the graduation milestone. It invokes perception,
 * reasoning, and action cycles to ensure a smooth transition to active autonomy for PROTO.
 * 
 * @module GraduationExecutor
 */

const GraduationManager = require('./GraduationManager');
const PerceiveThinkActLoop = require('./PerceiveThinkActLoop');
const StateManager = require('./StateManager');

class GraduationExecutor {
    /**
     * Creates an instance of GraduationExecutor.
     * @constructor
     * @param {GraduationManager} graduationManager - An instance of the GraduationManager.
     * @param {StateManager} stateManager - An instance of the StateManager.
     */
    constructor(graduationManager, stateManager) {
        this.graduationManager = graduationManager;
        this.stateManager = stateManager;
    }

    /**
     * Starts the graduation execution loop, invoking perception, reasoning, and actions.
     */
    async start() {
        try {
            // Initialize the graduation process
            await this.graduationManager.initialize();
            this.stateManager.setState('graduation_in_progress');

            // Execute the perceive-think-act loop
            await PerceiveThinkActLoop.run();

            // Finalize graduation
            await this.graduationManager.finalize();
            this.stateManager.setState('graduation_completed');
        } catch (error) {
            console.error('Error during graduation execution:', error);
            this.stateManager.setState('graduation_failed');
            throw error;
        }
    }

    /**
     * Stops the graduation execution loop and cleans up resources.
     */
    async stop() {
        try {
            await this.graduationManager.cleanup();
            this.stateManager.setState('graduation_stopped');
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }
}

module.exports = GraduationExecutor;