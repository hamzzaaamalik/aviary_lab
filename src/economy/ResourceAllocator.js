/**
 * ResourceAllocator manages the allocation of resources based on budgeting policies.
 * It ensures efficient utilization of resources while adhering to defined constraints.
 */
class ResourceAllocator {
    constructor() {
        this.resources = {};
        this.budgets = {};
    }

    /**
     * Sets the budget for a given resource type.
     * @param {string} resourceType - The type of resource to budget.
     * @param {number} amount - The budgeted amount for the resource.
     * @throws {Error} Throws error if the budget amount is negative.
     */
    setBudget(resourceType, amount) {
        if (amount < 0) {
            throw new Error('Budget amount cannot be negative.');
        }
        this.budgets[resourceType] = amount;
    }

    /**
     * Allocates resources based on the current budget and available resources.
     * @param {string} resourceType - The type of resource to allocate.
     * @param {number} requested - The amount of resource requested.
     * @returns {number} - The allocated amount of resources.
     * @throws {Error} Throws error if requested amount exceeds the budget.
     */
    allocateResources(resourceType, requested) {
        const budget = this.budgets[resourceType] || 0;
        const available = this.resources[resourceType] || 0;

        if (requested > budget) {
            throw new Error('Requested resource exceeds the budget.');
        }
        if (requested > available) {
            requested = available;
        }

        this.resources[resourceType] -= requested;
        return requested;
    }

    /**
     * Adds resources of a specific type.
     * @param {string} resourceType - The type of resource to add.
     * @param {number} amount - The amount of resources to add.
     * @throws {Error} Throws error if the amount is negative.
     */
    addResources(resourceType, amount) {
        if (amount < 0) {
            throw new Error('Cannot add negative resources.');
        }
        this.resources[resourceType] = (this.resources[resourceType] || 0) + amount;
    }

    /**
     * Gets the current budget for a given resource type.
     * @param {string} resourceType - The type of resource.
     * @returns {number} - The current budget for the resource type.
     */
    getBudget(resourceType) {
        return this.budgets[resourceType] || 0;
    }

    /**
     * Gets the current available resources for a given type.
     * @param {string} resourceType - The type of resource.
     * @returns {number} - The available amount of resources.
     */
    getAvailableResources(resourceType) {
        return this.resources[resourceType] || 0;
    }
}

module.exports = ResourceAllocator;