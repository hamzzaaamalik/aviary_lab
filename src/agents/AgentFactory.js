/**
 * AgentFactory class for creating new agents with specified identities.
 * 
 * This module is responsible for instantiating agents with unique identities and managing their lifecycle.
 */
class AgentFactory {
    /**
     * Creates an instance of an agent with a unique identity.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @param {object} agentData - Initial data for the agent's state.
     * @returns {AgentIdentity} - A new instance of AgentIdentity.
     */
    static createAgent(agentId, agentData) {
        this.validateAgentId(agentId);
        const identity = new AgentIdentity(agentId, agentData);
        return identity;
    }

    /**
     * Validates the unique agent ID.
     * 
     * @param {string} agentId - The agent ID to validate.
     * @throws {Error} - Throws error if the agent ID is invalid.
     */
    static validateAgentId(agentId) {
        if (typeof agentId !== 'string' || agentId.trim() === '') {
            throw new Error('Invalid agent ID. Must be a non-empty string.');
        }
    }

    /**
     * Initializes the agent with its lifecycle and necessary properties.
     * 
     * @param {AgentIdentity} agent - The agent to initialize.
     */
    static initializeAgent(agent) {
        if (!(agent instanceof AgentIdentity)) {
            throw new Error('Invalid agent instance.');
        }
        // Further initialization logic here
        agent.initializeLifecycle();
    }
}

export default AgentFactory;