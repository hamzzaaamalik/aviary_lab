/**
 * ResourceAllocator is responsible for managing and allocating resources based on current needs
 * and future projections. It ensures that all economic activities are funded appropriately.
 *
 * @module ResourceAllocator
 */

class ResourceAllocator {
    constructor() {
        this.resources = {};
    }

    /**
     * Add resources to the allocator.
     * @param {string} resourceType - The type of resource being added.
     * @param {number} amount - The amount of resource to be added.
     */
    addResource(resourceType, amount) {
        if (this.resources[resourceType]) {
            this.resources[resourceType] += amount;
        } else {
            this.resources[resourceType] = amount;
        }
    }

    /**
     * Allocate resources based on specified needs.
     * @param {Object} needs - An object mapping resource types to required amounts.
     * @returns {Object} - An object indicating allocation results and remaining resources.
     */
    allocateResources(needs) {
        const allocationResults = {};
        for (const resourceType in needs) {
            if (this.resources[resourceType] >= needs[resourceType]) {
                allocationResults[resourceType] = needs[resourceType];
                this.resources[resourceType] -= needs[resourceType];
            } else {
                allocationResults[resourceType] = this.resources[resourceType];
                this.resources[resourceType] = 0;
            }
        }
        return {
            allocationResults,
            remainingResources: this.resources
        };
    }

    /**
     * Check the current resource status.
     * @returns {Object} - A snapshot of available resources.
     */
    getResourceStatus() {
        return this.resources;
    }
}

export default ResourceAllocator;