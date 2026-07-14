/**
 * AgentIntegration.js
 * 
 * This module establishes interfaces and utilities for integrating various agent components
 * into a cohesive architecture, enabling modular development and interaction.
 * 
 * @module sdk/AgentIntegration
 */

import AgentFactory from '../agents/AgentFactory';
import AgentIdentity from '../agents/AgentIdentity';
import AgentLifecycle from '../agents/AgentLifecycle';

/**
 * Represents an integration layer for managing agents.
 */
class AgentIntegration {
    /**
     * Creates an instance of AgentIntegration.
     * @param {string} id - The unique identifier for the integration.
     */
    constructor(id) {
        this.id = id;
        this.agents = new Map();
    }

    /**
     * Registers a new agent with the integration.
     * @param {Object} agentConfig - The configuration for the agent.
     * @returns {AgentIdentity} - The identity of the registered agent.
     * @throws {Error} - Throws an error if the agent cannot be registered.
     */
    registerAgent(agentConfig) {
        const agent = AgentFactory.createAgent(agentConfig);
        if (!agent) throw new Error('Agent registration failed.');

        const identity = new AgentIdentity(agentConfig.id);
        this.agents.set(identity.id, agent);
        return identity;
    }

    /**
     * Starts the lifecycle of the registered agents.
     * @returns {void}
     */
    startAgents() {
        this.agents.forEach((agent) => {
            AgentLifecycle.start(agent);
        });
    }

    /**
     * Stops the lifecycle of the registered agents.
     * @returns {void}
     */
    stopAgents() {
        this.agents.forEach((agent) => {
            AgentLifecycle.stop(agent);
        });
    }

    /**
     * Retrieves an agent by its identity.
     * @param {string} identityId - The unique identifier of the agent.
     * @returns {Object|null} - Returns the agent if found, otherwise null.
     */
    getAgent(identityId) {
        return this.agents.get(identityId) || null;
    }

    /**
     * Retrieves all registered agents.
     * @returns {Array} - An array of all registered agents.
     */
    getAllAgents() {
        return Array.from(this.agents.values());
    }
}

export default AgentIntegration;
