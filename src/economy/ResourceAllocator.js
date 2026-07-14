/**
 * ResourceAllocator Class
 * Manages the allocation and budgeting of resources for self-funding agents.
 */
class ResourceAllocator {
    constructor() {
        this.resources = {};
        this.budget = {};
    }

    /**
     * Initialize the resource allocator with a specific budget.
     * @param {string} agentId - The identifier for the agent.
     * @param {number} initialBudget - The initial budget for the agent.
     */
    initialize(agentId, initialBudget) {
        this.resources[agentId] = 0;
        this.budget[agentId] = initialBudget;
    }

    /**
     * Allocate resources to an agent.
     * @param {string} agentId - The identifier for the agent.
     * @param {number} amount - The amount of resources to allocate.
     * @throws {Error} Throws an error if allocation exceeds available budget.
     */
    allocate(agentId, amount) {
        if (this.budget[agentId] < amount) {
            throw new Error(`Insufficient budget for agent ${agentId}.`);
        }
        this.resources[agentId] += amount;
        this.budget[agentId] -= amount;
    }

    /**
     * Deallocate resources from an agent.
     * @param {string} agentId - The identifier for the agent.
     * @param {number} amount - The amount of resources to deallocate.
     * @throws {Error} Throws an error if deallocation exceeds allocated resources.
     */
    deallocate(agentId, amount) {
        if (this.resources[agentId] < amount) {
            throw new Error(`Cannot deallocate more than allocated resources for agent ${agentId}.`);
        }
        this.resources[agentId] -= amount;
        this.budget[agentId] += amount;
    }

    /**
     * Get the current resource allocation for an agent.
     * @param {string} agentId - The identifier for the agent.
     * @returns {number} The allocated resources for the agent.
     */
    getAllocatedResources(agentId) {
        return this.resources[agentId] || 0;
    }

    /**
     * Get the remaining budget for an agent.
     * @param {string} agentId - The identifier for the agent.
     * @returns {number} The remaining budget for the agent.
     */
    getRemainingBudget(agentId) {
        return this.budget[agentId] || 0;
    }
}

module.exports = ResourceAllocator;
