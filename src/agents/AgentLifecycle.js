/**
 * AgentLifecycle class manages the life cycle of agents, including creation, state management, and destruction.
 * 
 * @class
 */
class AgentLifecycle {
    /**
     * Initializes an instance of the AgentLifecycle.
     * @constructor
     */
    constructor() {
        this.agents = {};
    }

    /**
     * Creates a new agent and adds it to the lifecycle management.
     * @param {string} agentId - Unique identifier for the agent.
     * @param {object} agentData - Initial data for the new agent.
     * @throws {Error} Will throw an error if the agentId already exists.
     */
    createAgent(agentId, agentData) {
        if (this.agents[agentId]) {
            throw new Error(`Agent with ID ${agentId} already exists.`);
        }
        this.agents[agentId] = { ...agentData, state: 'active' };
    }

    /**
     * Retrieves an agent by its ID.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {object} The agent data.
     * @throws {Error} Will throw an error if the agent does not exist.
     */
    getAgent(agentId) {
        const agent = this.agents[agentId];
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        return agent;
    }

    /**
     * Updates the state of an agent.
     * @param {string} agentId - Unique identifier for the agent.
     * @param {string} newState - The new state for the agent.
     * @throws {Error} Will throw an error if the agent does not exist.
     */
    updateAgentState(agentId, newState) {
        if (!this.agents[agentId]) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        this.agents[agentId].state = newState;
    }

    /**
     * Destroys an agent and removes it from lifecycle management.
     * @param {string} agentId - Unique identifier for the agent.
     * @throws {Error} Will throw an error if the agent does not exist.
     */
    destroyAgent(agentId) {
        if (!this.agents[agentId]) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        delete this.agents[agentId];
    }
}

module.exports = AgentLifecycle;
