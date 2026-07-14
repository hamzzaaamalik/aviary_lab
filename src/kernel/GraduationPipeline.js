/**
 * GraduationPipeline orchestrates the flow from perception through reasoning to action.
 * It integrates the PerceiveThinkAct loop with the Graduation components.
 *
 * @module GraduationPipeline
 */

const PerceptionProcessor = require('./PerceptionProcessor');
const GraduationCoordinator = require('./GraduationCoordinator');
const GraduationManager = require('./GraduationManager');
const GraduationEventHandler = require('./GraduationEventHandler');

class GraduationPipeline {
    constructor() {
        this.perceptionProcessor = new PerceptionProcessor();
        this.graduationCoordinator = new GraduationCoordinator();
        this.graduationManager = new GraduationManager();
        this.eventHandler = new GraduationEventHandler();
    }

    /**
     * Initiates the graduation process by processing incoming signals.
     * @param {Object} signal - The incoming signal to be processed.
     */
    initiateGraduation(signal) {
        this.perceptionProcessor.processSignal(signal);
        const processedData = this.perceptionProcessor.getProcessedData();
        this.handleReasoning(processedData);
    }

    /**
     * Handles reasoning based on the processed data.
     * @param {Object} data - The data processed from the perception module.
     */
    handleReasoning(data) {
        const graduationPlan = this.graduationCoordinator.coordinate(data);
        this.executeGraduation(graduationPlan);
    }

    /**
     * Executes the graduation plan through the Graduation Manager.
     * @param {Object} plan - The graduation plan to execute.
     */
    executeGraduation(plan) {
        this.graduationManager.execute(plan);
        this.eventHandler.handleEvent(plan);
    }
}

module.exports = GraduationPipeline;
