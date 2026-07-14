/**
 * ResourceAllocator is responsible for managing and allocating resources efficiently within the system.
 * It tracks the available resources, assigns them to various modules based on policies, and ensures that
 * the consumption does not exceed the available supply.
 *
 * @class ResourceAllocator
 * @property {Map<String, number>} resources - A map to track available resources and their quantities.
 * @property {Map<String, number>} allocations - A map to track allocated resources and their quantities.
 */
class ResourceAllocator {
    constructor() {
        this.resources = new Map();
        this.allocations = new Map();
    }

    /**
     * Adds resources to the allocator. If the resource already exists, increments its quantity.
     * @param {string} resourceName - Name of the resource to be added.
     * @param {number} quantity - Quantity of the resource to be added.
     * @throws {Error} Throws error if the quantity is negative.
     */
    addResource(resourceName, quantity) {
        if (quantity < 0) {
            throw new Error('Quantity must be non-negative.');
        }
        this.resources.set(resourceName, (this.resources.get(resourceName) || 0) + quantity);
    }

    /**
     * Allocates resources to a specific module or task if the requested quantity is available.
     * @param {string} resourceName - Name of the resource to be allocated.
     * @param {number} requested - Quantity of the resource to allocate.
     * @returns {boolean} Returns true if allocation was successful, false otherwise.
     */
    allocate(resourceName, requested) {
        const available = this.resources.get(resourceName) || 0;
        if (requested <= available) {
            this.resources.set(resourceName, available - requested);
            this.allocations.set(resourceName, (this.allocations.get(resourceName) || 0) + requested);
            return true;
        }
        return false; // Not enough resources available
    }

    /**
     * Releases allocated resources back to the pool.
     * @param {string} resourceName - Name of the resource to release.
     * @param {number} quantity - Quantity to release.
     * @throws {Error} Throws error if trying to release more than allocated.
     */
    release(resourceName, quantity) {
        const allocated = this.allocations.get(resourceName) || 0;
        if (quantity > allocated) {
            throw new Error('Cannot release more than allocated.');
        }
        this.allocations.set(resourceName, allocated - quantity);
        this.resources.set(resourceName, (this.resources.get(resourceName) || 0) + quantity);
    }

    /**
     * Gets the available quantity of a specific resource.
     * @param {string} resourceName - Name of the resource to query.
     * @returns {number} The available quantity of the resource.
     */
    getAvailable(resourceName) {
        return this.resources.get(resourceName) || 0;
    }

    /**
     * Gets the total allocated quantity of a specific resource.
     * @param {string} resourceName - Name of the resource to query.
     * @returns {number} The allocated quantity of the resource.
     */
    getAllocated(resourceName) {
        return this.allocations.get(resourceName) || 0;
    }
}

module.exports = ResourceAllocator;
