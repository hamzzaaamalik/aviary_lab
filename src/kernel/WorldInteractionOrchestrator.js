/**
 * WorldInteractionOrchestrator manages interactions between agents and the environment.
 * It facilitates the orchestration of actions and responses based on the current state of the world.
 * 
 * @module WorldInteractionOrchestrator
 */

class WorldInteractionOrchestrator {
    constructor(eventBus, stateManager) {
        /**
         * @type {EventBus}
         * @private
         */
        this.eventBus = eventBus;
        
        /**
         * @type {StateManager}
         * @private
         */
        this.stateManager = stateManager;
    }

    /**
     * Initiates interaction based on agent actions and world state.
     * @param {Array} agents - An array of agents initiating interaction.
     */
    initiateInteraction(agents) {
        agents.forEach(agent => {
            const action = agent.decideAction(this.stateManager);
            this.executeAction(agent, action);
        });
    }

    /**
     * Executes a given action from an agent and updates the world state accordingly.
     * @param {Agent} agent - The agent executing the action.
     * @param {Action} action - The action to execute.
     */
    executeAction(agent, action) {
        try {
            const result = action.perform();
            this.updateWorldState(agent, result);
            this.eventBus.publish('actionExecuted', { agent, action, result });
        } catch (error) {
            this.eventBus.publish('actionFailed', { agent, action, error });
        }
    }

    /**
     * Updates the world state based on the result of an action.
     * @param {Agent} agent - The agent whose action has been executed.
     * @param {any} result - The result of the action execution.
     */
    updateWorldState(agent, result) {
        this.stateManager.update(agent, result);
    }
}

module.exports = WorldInteractionOrchestrator;