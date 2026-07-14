/**
 * AgentSDK.js
 * A Software Development Kit for building and managing agents in the Proto framework.
 * 
 * This SDK provides utilities to create agents, manage their lifecycle, and facilitate interaction with 
 * the core functionalities of the Proto system. This module is designed to be extended by third-party developers.
 * 
 * @module AgentSDK
 */

import AgentFactory from '../agents/AgentFactory.js';
import AgentLifecycle from '../agents/AgentLifecycle.js';

/**
 * AgentSDK class.
 * 
 * This class serves as the primary interface for creating and managing agents. It encapsulates the 
 * functionalities needed to interact with the agent subsystem within Proto.
 */
class AgentSDK {
    constructor() {
        this.agents = new Map();
    }

    /**
     * Creates a new agent instance.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @param {Object} agentConfig - Configuration settings for the agent.
     * @returns {Object} The created agent instance.
     * @throws {Error} If the agent ID is already in use.
     */
    createAgent(agentId, agentConfig) {
        if (this.agents.has(agentId)) {
            throw new Error(`Agent with ID ${agentId} already exists.`);
        }
        const agent = AgentFactory.create(agentId, agentConfig);
        this.agents.set(agentId, agent);
        return agent;
    }

    /**
     * Activates the specified agent.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @throws {Error} If the agent does not exist or is already active.
     */
    activateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        AgentLifecycle.activate(agent);
    }

    /**
     * Deactivates the specified agent.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @throws {Error} If the agent does not exist or is already inactive.
     */
    deactivateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        AgentLifecycle.deactivate(agent);
    }

    /**
     * Retrieves an agent instance by ID.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {Object|null} The agent instance, or null if not found.
     */
    getAgent(agentId) {
        return this.agents.get(agentId) || null;
    }

    /**
     * Lists all active agents.
     * 
     * @returns {Array} Array of active agent IDs.
     */
    listActiveAgents() {
        return [...this.agents.keys()];
    }
}

export default new AgentSDK();