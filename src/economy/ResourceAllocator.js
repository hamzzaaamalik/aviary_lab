/**
 * ResourceAllocator
 * 
 * This module is responsible for managing the allocation of resources within the system. 
 * It includes methods for budgeting, tracking resource usage, and implementing allocation policies.
 * 
 * @module ResourceAllocator
 */

class ResourceAllocator {
    constructor() {
        /**
         * Budget for the current resource allocation cycle.
         * @type {number}
         */
        this.budget = 0;
        /**
         * Dictionary to track resource usage.
         * @type {Object}
         */
        this.resourceUsage = {};
    }

    /**
     * Sets the budget for resource allocation.
     * @param {number} amount - The budget amount to set.
     */
    setBudget(amount) {
        if (amount < 0) {
            throw new Error('Budget cannot be negative.');
        }
        this.budget = amount;
    }

    /**
     * Allocates resources based on usage requests.
     * @param {string} resource - The resource to allocate.
     * @param {number} amount - The amount to allocate.
     * @throws {Error} Throws if the request exceeds the budget or if the amount is invalid.
     */
    allocateResource(resource, amount) {
        if (amount <= 0) {
            throw new Error('Allocation amount must be greater than zero.');
        }
        if (this.budget < amount) {
            throw new Error('Insufficient budget for this allocation.');
        }
        this.budget -= amount;
        this.resourceUsage[resource] = (this.resourceUsage[resource] || 0) + amount;
    }

    /**
     * Retrieves the current budget.
     * @returns {number} The current budget.
     */
    getBudget() {
        return this.budget;
    }

    /**
     * Gets the resource usage statistics.
     * @returns {Object} An object containing resource usage data.
     */
    getResourceUsage() {
        return this.resourceUsage;
    }

    /**
     * Resets the resource tracker and budget for a new cycle.
     */
    reset() {
        this.budget = 0;
        this.resourceUsage = {};
    }
}

module.exports = ResourceAllocator;

// Example test case for ResourceAllocator
if (require.main === module) {
    const allocator = new ResourceAllocator();
    allocator.setBudget(100);
    allocator.allocateResource('CPU', 30);
    console.log(allocator.getBudget()); // Should log 70
    console.log(allocator.getResourceUsage()); // Should log { CPU: 30 }
