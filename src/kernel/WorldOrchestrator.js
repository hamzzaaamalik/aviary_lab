/**
 * WorldOrchestrator - Coordinates the various aspects of the living world.
 *
 * Handles interactions between agents, economy, governance, and proto modules.
 * Provides a central loop for world state updates and event propagation.
 *
 * @module WorldOrchestrator
 */

class WorldOrchestrator {
    constructor() {
        this.agents = [];
        this.economy = null;
        this.governance = null;
    }

    /**
     * Initializes the orchestrator with necessary components.
     *
     * @param {Object} config - Configuration object containing the necessary modules.
     * @param {Array} agents - An array of agent instances to be managed.
     */
    initialize(config, agents) {
        this.economy = config.economy;
        this.governance = config.governance;
        this.agents = agents;
    }

    /**
     * Main loop for the world orchestrator, updates all components.
     *
     * @param {number} deltaTime - Time elapsed since the last update.
     */
    update(deltaTime) {
        this.updateAgents(deltaTime);
        this.economy.update(deltaTime);
        this.governance.update(deltaTime);
    }

    /**
     * Updates agent states and actions based on the current world context.
     *
     * @param {number} deltaTime - Time elapsed since the last update.
     */
    updateAgents(deltaTime) {
        for (const agent of this.agents) {
            agent.update(deltaTime);
        }
    }

    /**
     * Sends a message to all agents in the world.
     *
     * @param {string} message - The message to send.
     */
    broadcastMessage(message) {
        for (const agent of this.agents) {
            agent.receiveMessage(message);
        }
    }

    /**
     * Returns the current state of the world for inspection.
     *
     * @returns {Object} - The current state of the world.
     */
    getState() {
        return {
            agents: this.agents.map(agent => agent.getState()),
            economy: this.economy.getState(),
            governance: this.governance.getState()
        };
    }
}

export default WorldOrchestrator;