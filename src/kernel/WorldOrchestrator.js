/**
 * WorldOrchestrator orchestrates the overall operation of the living world.
 * It coordinates agent interactions, manages event propagation, and maintains world state.
 */
class WorldOrchestrator {
    constructor() {
        this.agents = new Map();
        this.eventBus = new EventBus();
    }

    /**
     * Register a new agent in the world.
     * @param {Agent} agent - The agent to register.
     */
    registerAgent(agent) {
        if (!(agent.id in this.agents)) {
            this.agents.set(agent.id, agent);
            this.eventBus.subscribe(agent);
        }
    }

    /**
     * Unregister an agent from the world.
     * @param {string} agentId - The ID of the agent to unregister.
     */
    unregisterAgent(agentId) {
        if (this.agents.has(agentId)) {
            const agent = this.agents.get(agentId);
            this.eventBus.unsubscribe(agent);
            this.agents.delete(agentId);
        }
    }

    /**
     * Process a tick in the world, updating agents and broadcasting events.
     */
    tick() {
        for (const agent of this.agents.values()) {
            agent.update();
        }
        const events = this.eventBus.getPendingEvents();
        this.eventBus.publish(events);
    }

    /**
     * Retrieve the current state of all registered agents.
     * @returns {Array} - An array of agents' states.
     */
    getAgentsState() {
        return Array.from(this.agents.values()).map(agent => agent.getState());
    }
}

export default WorldOrchestrator;