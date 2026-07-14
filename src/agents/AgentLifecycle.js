/**
 * AgentLifecycle manages the lifecycle of agents, including creation, activation, and termination.
 * This class ensures that agents are correctly initialized and can transition through their life stages.
 */
class AgentLifecycle {
    constructor() {
        this.agents = new Map();
    }

    /**
     * Create and initialize a new agent.
     * @param {string} agentId - Unique identifier for the agent.
     * @param {Object} agentData - Initial data for the agent.
     * @returns {boolean} - Returns true if the agent is successfully created.
     */
    createAgent(agentId, agentData) {
        if (this.agents.has(agentId)) {
            throw new Error(`Agent with ID ${agentId} already exists.`);
        }
        const agent = new NewAgent(agentId, agentData);
        this.agents.set(agentId, agent);
        return true;
    }

    /**
     * Activate an existing agent.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {boolean} - Returns true if the agent is successfully activated.
     */
    activateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        agent.activate();
        return true;
    }

    /**
     * Terminate an existing agent.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {boolean} - Returns true if the agent is successfully terminated.
     */
    terminateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        agent.terminate();
        this.agents.delete(agentId);
        return true;
    }

    /**
     * Retrieve an agent by its ID.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {NewAgent|null} - Returns the agent if found, otherwise null.
     */
    getAgent(agentId) {
        return this.agents.get(agentId) || null;
    }
}

export default AgentLifecycle;