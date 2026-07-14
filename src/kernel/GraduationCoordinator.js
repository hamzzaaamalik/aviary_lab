/**
 * GraduationCoordinator manages the flow of events and actions during
 * the Graduation milestone. It orchestrates the various components
 * involved in the perceive-think-act loop.
 */
class GraduationCoordinator {
    constructor(eventBus, graduationManager) {
        this.eventBus = eventBus;
        this.graduationManager = graduationManager;
        this.registerEvents();
    }

    /**
     * Registers event listeners with the EventBus.
     */
    registerEvents() {
        this.eventBus.on('graduation.start', this.handleGraduationStart.bind(this));
        this.eventBus.on('graduation.complete', this.handleGraduationComplete.bind(this));
    }

    /**
     * Handles the start of the graduation process.
     * Triggers necessary actions to initiate the loop.
     * @param {Object} event - The event object containing data related to the graduation start.
     */
    handleGraduationStart(event) {
        console.log('Graduation process started.');
        this.graduationManager.initialize(event.data);
        this.eventBus.emit('graduation.initialized');
    }

    /**
     * Handles the completion of the graduation process.
     * Triggers actions required upon completion.
     * @param {Object} event - The event object containing data related to the graduation completion.
     */
    handleGraduationComplete(event) {
        console.log('Graduation process completed.');
        this.graduationManager.finalize(event.data);
        this.eventBus.emit('graduation.finalized');
    }
}

module.exports = GraduationCoordinator;
