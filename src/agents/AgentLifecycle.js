/**
 * AgentLifecycle manages the state transitions and lifecycle events of agents.
 * It provides hooks for initialization, activation, and termination of agents.
 */
class AgentLifecycle {
    constructor() {
        this.agents = new Map(); // Stores agents by their ID
    }

    /**
     * Registers a new agent in the lifecycle.
     * @param {string} agentId - Unique identifier for the agent.
     * @param {object} agent - The agent instance.
     */
    registerAgent(agentId, agent) {
        if (this.agents.has(agentId)) {
            throw new Error(`Agent with ID ${agentId} is already registered.`);
        }
        this.agents.set(agentId, agent);
        this.initializeAgent(agentId);
    }

    /**
     * Initializes the agent's lifecycle by triggering its start methods.
     * @param {string} agentId - Unique identifier for the agent.
     */
    initializeAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (agent && typeof agent.start === 'function') {
            agent.start();
        }
    }

    /**
     * Activates the agent, allowing it to process its tasks.
     * @param {string} agentId - Unique identifier for the agent.
     */
    activateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (agent && typeof agent.activate === 'function') {
            agent.activate();
        }
    }

    /**
     * Deactivates the agent, halting its operations.
     * @param {string} agentId - Unique identifier for the agent.
     */
    deactivateAgent(agentId) {
        const agent = this.agents.get(agentId);
        if (agent && typeof agent.deactivate === 'function') {
            agent.deactivate();
        }
    }

    /**
     * Unregisters the agent from the lifecycle, cleaning up resources.
     * @param {string} agentId - Unique identifier for the agent.
     */
    unregisterAgent(agentId) {
        if (!this.agents.has(agentId)) {
            throw new Error(`Agent with ID ${agentId} is not registered.`);
        }
        this.deactivateAgent(agentId);
        this.agents.delete(agentId);
    }
}

export default AgentLifecycle;