/**
 * @module AgentIntegration
 * @description This module provides an interface for integrating various agents into the Open Framework, allowing seamless communication and collaboration among different components.
 */

class AgentIntegration {
    constructor() {
        this.agents = new Map();
    }

    /**
     * Registers a new agent into the integration system.
     * @param {string} agentId - The unique identifier for the agent.
     * @param {Object} agentInstance - The instance of the agent to register.
     * @throws {Error} If an agent with the same ID already exists.
     */
    registerAgent(agentId, agentInstance) {
        if (this.agents.has(agentId)) {
            throw new Error('Agent with this ID already exists.');
        }
        this.agents.set(agentId, agentInstance);
    }

    /**
     * Deregisters an agent from the integration system.
     * @param {string} agentId - The unique identifier for the agent.
     * @throws {Error} If the agent does not exist.
     */
    deregisterAgent(agentId) {
        if (!this.agents.has(agentId)) {
            throw new Error('Agent not found.');
        }
        this.agents.delete(agentId);
    }

    /**
     * Sends a message to a specific agent.
     * @param {string} agentId - The unique identifier for the target agent.
     * @param {Object} message - The message payload to send.
     * @throws {Error} If the agent does not exist.
     */
    sendMessageToAgent(agentId, message) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error('Agent not found.');
        }
        agent.receiveMessage(message);
    }

    /**
     * Broadcasts a message to all registered agents.
     * @param {Object} message - The message payload to send to all agents.
     */
    broadcastMessage(message) {
        for (const agent of this.agents.values()) {
            agent.receiveMessage(message);
        }
    }
}

export default AgentIntegration;