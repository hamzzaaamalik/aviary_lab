/**
 * CommissionIntake handles the intake of new commission requests.
 * It validates inputs and stores valid requests in the queue for processing.
 *
 * @module CommissionIntake
 */

const CommissionQueue = require('./CommissionQueue');
const { validateCommission } = require('../memeValidator');

class CommissionIntake {
    constructor() {
        this.queue = new CommissionQueue();
    }

    /**
     * Intake a new commission request.
     * @param {Object} commissionData - The commission data.
     * @param {string} commissionData.title - Title of the commission.
     * @param {string} commissionData.description - Description of the commission.
     * @param {string} commissionData.client - Client's name.
     * @throws {Error} If the commission data is invalid.
     */
    intake(commissionData) {
        const validationErrors = validateCommission(commissionData);
        if (validationErrors.length) {
            throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
        }
        this.queue.enqueue(commissionData);
    }

    /**
     * Get the current state of the commission queue.
     * @returns {Array} The current queue of commissions.
     */
    getQueueState() {
        return this.queue.getQueue();
    }
}

module.exports = CommissionIntake;
