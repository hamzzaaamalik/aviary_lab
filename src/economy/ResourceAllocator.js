/**
 * ResourceAllocator manages allocation of resources for agents.
 * It tracks resource availability and allocates them based on policies.
 */
class ResourceAllocator {
    constructor() {
        this.resources = {};
    }

    /**
     * Adds a resource to the allocator.
     * @param {string} resourceName - The name of the resource.
     * @param {number} amount - The amount of the resource to add.
     */
    addResource(resourceName, amount) {
        if (amount <= 0) throw new Error('Amount must be positive.');
        this.resources[resourceName] = (this.resources[resourceName] || 0) + amount;
    }

    /**
     * Allocates a resource to an agent if available.
     * @param {string} resourceName - The name of the resource to allocate.
     * @param {number} amount - The amount of the resource to allocate.
     * @returns {boolean} - True if allocation was successful, otherwise false.
     */
    allocateResource(resourceName, amount) {
        if (this.resources[resourceName] === undefined || this.resources[resourceName] < amount) {
            return false; // Not enough resources available
        }
        this.resources[resourceName] -= amount;
        return true;
    }

    /**
     * Releases a previously allocated resource back to the allocator.
     * @param {string} resourceName - The name of the resource to release.
     * @param {number} amount - The amount of the resource to release.
     */
    releaseResource(resourceName, amount) {
        if (amount <= 0) throw new Error('Amount must be positive.');
        this.resources[resourceName] = (this.resources[resourceName] || 0) + amount;
    }

    /**
     * Gets the available amount of a resource.
     * @param {string} resourceName - The name of the resource.
     * @returns {number} - The available amount of the resource.
     */
    getAvailable(resourceName) {
        return this.resources[resourceName] || 0;
    }
}

module.exports = ResourceAllocator;