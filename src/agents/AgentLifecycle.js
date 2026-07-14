/**
 * AgentLifecycle class to manage the lifecycle of agents in the system.
 * Handles spawning, activation, and deactivation of agent instances.
 */
class AgentLifecycle {
    constructor() {
        this.agents = new Map(); // Store active agents
    }

    /**
     * Spawns a new agent with a unique identity.
     * @param {string} agentId - Unique identifier for the agent.
     * @param {object} initialState - Initial state for the agent.
     * @returns {void}
     */
    spawnAgent(agentId, initialState) {
        if (this.agents.has(agentId)) {
            throw new Error(`Agent with ID ${agentId} already exists.`);
        }
        const agent = new Agent(agentId, initialState);
        this.agents.set(agentId, agent);
    }

    /**
     * Activates an existing agent by its ID.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {void}
     */
    activateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        agent.activate();
    }

    /**
     * Deactivates an existing agent by its ID.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {void}
     */
    deactivateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent with ID ${agentId} does not exist.`);
        }
        agent.deactivate();
    }

    /**
     * Retrieves an agent by its ID.
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {Agent|null} - The agent instance or null if not found.
     */
    getAgent(agentId) {
        return this.agents.get(agentId) || null;
    }
}

// Assumes a simple Agent class exists.
class Agent {
    constructor(id, state) {
        this.id = id;
        this.state = state;
        this.active = false;
    }

    activate() {
        this.active = true;
        // Additional activation logic.
    }

    deactivate() {
        this.active = false;
        // Additional deactivation logic.
    }
}

export default AgentLifecycle;