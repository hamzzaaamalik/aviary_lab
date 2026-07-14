/**
 * @module CommissionIntake
 * @description Handles the intake of commission requests, validating and queuing them for processing.
 */

const CommissionQueue = require('./CommissionQueue');
const { validateCommission } = require('../memeValidator');

/**
 * Represents a commission intake processor.
 */
class CommissionIntake {
    constructor() {
        this.queue = new CommissionQueue();
    }

    /**
     * Intake a new commission request.
     * @param {Object} commissionData - The commission request data.
     * @returns {Promise<string>} - A message indicating the success of the operation.
     * @throws {Error} - Throws an error if the commission data is invalid or if queuing fails.
     */
    async intake(commissionData) {
        // Validate the commission data
        const validationResult = validateCommission(commissionData);
        if (!validationResult.isValid) {
            throw new Error(`Invalid commission data: ${validationResult.errors.join(', ')}`);
        }

        // Queue the commission request
        try {
            await this.queue.enqueue(commissionData);
            return 'Commission request has been successfully queued.';
        } catch (error) {
            throw new Error('Failed to queue commission: ' + error.message);
        }
    }
}

module.exports = CommissionIntake;
