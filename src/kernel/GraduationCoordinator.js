/**
 * @module GraduationCoordinator
 * @description Coordinates the graduation process by integrating the various components necessary for PROTO's operation.
 */

class GraduationCoordinator {
    constructor(eventBus, graduationManager, stateManager) {
        this.eventBus = eventBus;
        this.graduationManager = graduationManager;
        this.stateManager = stateManager;
        this.isGraduated = false;
        this.initializeListeners();
    }

    /**
     * Initializes event listeners for graduation events.
     */
    initializeListeners() {
        this.eventBus.on('graduation:check', this.checkGraduationStatus.bind(this));
        this.eventBus.on('graduation:execute', this.executeGraduation.bind(this));
    }

    /**
     * Checks if PROTO is ready for graduation.
     * @returns {boolean} - True if PROTO is ready to graduate, false otherwise.
     */
    checkGraduationStatus() {
        // Check if all necessary modules are functioning
        const allModulesReady = this.graduationManager.areModulesReady();
        const currentState = this.stateManager.getCurrentState();

        if (allModulesReady && currentState === 'stable') {
            this.isGraduated = true;
            this.eventBus.emit('graduation:status', 'ready');
        } else {
            this.eventBus.emit('graduation:status', 'not_ready');
        }
    }

    /**
     * Executes the graduation process if all conditions are met.
     */
    executeGraduation() {
        if (this.isGraduated) {
            console.log('Graduation process initiated.');
            // Proceed with further graduation steps
            this.graduationManager.finalizeGraduation();
        } else {
            console.warn('Graduation cannot be executed; conditions are not met.');
        }
    }
}

export default GraduationCoordinator;
