/**
 * GraduationProcessor - Manages the process of graduation by integrating different modules.
 * Handles the flow of data from perception to reasoning and finally to action.
 * @module GraduationProcessor
 */

class GraduationProcessor {
    constructor(eventBus, stateManager, perceptionProcessor, reasoningBridge) {
        this.eventBus = eventBus;
        this.stateManager = stateManager;
        this.perceptionProcessor = perceptionProcessor;
        this.reasoningBridge = reasoningBridge;
    }

    /**
     * Initializes the graduation process by setting up event listeners and state.
     */
    init() {
        this.eventBus.subscribe('PERCEPTION_UPDATE', this.handlePerceptionUpdate.bind(this));
        this.eventBus.subscribe('STATE_CHANGE', this.handleStateChange.bind(this));
    }

    /**
     * Handles new perception data and triggers reasoning.
     * @param {Object} perceptionData - The data from the perception module.
     */
    handlePerceptionUpdate(perceptionData) {
        const processedData = this.perceptionProcessor.process(perceptionData);
        this.reasoningBridge.bringToReasoning(processedData);
    }

    /**
     * Responds to state changes and decides on actions.
     * @param {Object} newState - The updated state object.
     */
    handleStateChange(newState) {
        const action = this.reasoningBridge.decideAction(newState);
        this.executeAction(action);
    }

    /**
     * Executes the decided action based on the reasoning results.
     * @param {Object} action - The action to be executed.
     */
    executeAction(action) {
        // Logic to execute the action, possibly interacting with other modules
        console.log('Executing action:', action);
    }
}

module.exports = GraduationProcessor;
