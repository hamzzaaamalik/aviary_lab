/**
 * ResourceAllocator class manages the allocation of resources within the system.
 * It maintains a budget and ensures that resources are allocated efficiently and effectively.
 * @class ResourceAllocator
 */
class ResourceAllocator {
    constructor() {
        /**
         * @type {number}
         * @private
         */
        this.budget = 0;

        /**
         * @type {Object<string, number>}
         * @private
         */
        this.resources = {};
    }

    /**
     * Sets the total budget available for allocation.
     * @param {number} amount - The amount to set as budget.
     */
    setBudget(amount) {
        if (amount < 0) throw new Error('Budget cannot be negative.');
        this.budget = amount;
    }

    /**
     * Adds resources to the allocator.
     * @param {string} resourceName - The name of the resource.
     * @param {number} quantity - The quantity of the resource to add.
     */
    addResource(resourceName, quantity) {
        if (quantity < 0) throw new Error('Resource quantity cannot be negative.');
        this.resources[resourceName] = (this.resources[resourceName] || 0) + quantity;
    }

    /**
     * Allocates resources based on the provided request.
     * @param {Object<string, number>} request - A mapping of resource names to requested quantities.
     * @returns {Object<string, number>} - The allocated resources.
     */
    allocateResources(request) {
        const allocation = {};
        let totalRequested = 0;

        for (const [resourceName, quantity] of Object.entries(request)) {
            if (this.resources[resourceName] < quantity) {
                throw new Error(`Insufficient resource: ${resourceName}`);
            }
            totalRequested += quantity;
            allocation[resourceName] = quantity;
            this.resources[resourceName] -= quantity;
        }

        if (totalRequested > this.budget) {
            throw new Error('Budget exceeded. Allocation failed.');
        }

        return allocation;
    }

    /**
     * Returns the current budget.
     * @returns {number} - The current budget.
     */
    getBudget() {
        return this.budget;
    }

    /**
     * Returns the current state of resources.
     * @returns {Object<string, number>} - The current resources available.
     */
    getResources() {
        return this.resources;
    }
}

module.exports = ResourceAllocator;
