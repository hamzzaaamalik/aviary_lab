/**
 * AgentInteractionTracker is responsible for monitoring and recording interactions
 * between agents in the system to facilitate better decision-making and resource
 * allocation.
 */
class AgentInteractionTracker {
    constructor() {
        this.interactions = new Map(); // Maps agent IDs to their interaction logs
    }

    /**
     * Records an interaction between two agents.
     * @param {string} agentAId - The ID of the first agent.
     * @param {string} agentBId - The ID of the second agent.
     * @param {Date} timestamp - The time when the interaction took place.
     */
    recordInteraction(agentAId, agentBId, timestamp = new Date()) {
        if (!this.interactions.has(agentAId)) {
            this.interactions.set(agentAId, []);
        }
        this.interactions.get(agentAId).push({ agentBId, timestamp });
    }

    /**
     * Retrieves interaction logs for a specific agent.
     * @param {string} agentId - The ID of the agent whose interactions are being queried.
     * @returns {Array} - An array of interaction logs for the specified agent.
     */
    getInteractionsForAgent(agentId) {
        return this.interactions.get(agentId) || [];
    }

    /**
     * Clears all interaction logs for a specific agent.
     * @param {string} agentId - The ID of the agent whose logs are to be cleared.
     */
    clearInteractions(agentId) {
        if (this.interactions.has(agentId)) {
            this.interactions.delete(agentId);
        }
    }

    /**
     * Clears all interaction logs in the tracker.
     */
    clearAllInteractions() {
        this.interactions.clear();
    }
}

module.exports = AgentInteractionTracker;