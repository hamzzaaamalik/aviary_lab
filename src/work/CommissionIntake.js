/**
 * Commission Intake Module
 * 
 * This module handles the intake of commission requests, validating input and storing the requests.
 * It is designed to integrate with the existing job queue and will provide an interface for
 * adding new commissions.
 * 
 * @module CommissionIntake
 */

const { JobQueue } = require('../kernel/JobQueue');

/**
 * Class representing the CommissionIntake.
 */
class CommissionIntake {
    constructor() {
        this.commissionRequests = [];
    }

    /**
     * Adds a commission request to the queue after validation.
     * 
     * @param {Object} request - The commission request object.
     * @param {string} request.id - The unique identifier for the commission.
     * @param {string} request.description - A brief description of the commission.
     * @param {number} request.value - The value of the commission.
     * @returns {boolean} Returns true if the commission is successfully added, otherwise false.
     */
    addCommission(request) {
        if (this.validateRequest(request)) {
            this.commissionRequests.push(request);
            JobQueue.enqueue(request); // Integrate with JobQueue
            return true;
        }
        return false;
    }

    /**
     * Validates the commission request.
     * 
     * @param {Object} request - The commission request object.
     * @returns {boolean} Returns true if the request is valid, otherwise false.
     */
    validateRequest(request) {
        const hasValidId = typeof request.id === 'string' && request.id.length > 0;
        const hasValidDescription = typeof request.description === 'string' && request.description.length > 0;
        const hasValidValue = typeof request.value === 'number' && request.value > 0;
        return hasValidId && hasValidDescription && hasValidValue;
    }

    /**
     * Gets all commission requests.
     * 
     * @returns {Array} An array of all commission requests.
     */
    getAllCommissions() {
        return this.commissionRequests;
    }
}

module.exports = CommissionIntake;
