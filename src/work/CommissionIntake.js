/**
 * CommissionIntake handles the intake of commission requests.
 * Validates input and provides an interface for adding to the queue.
 *
 * @class
 */
class CommissionIntake {
    /**
     * Creates an instance of CommissionIntake.
     * @param {CommissionQueue} queue - The queue to which commissions will be added.
     */
    constructor(queue) {
        this.queue = queue;
    }

    /**
     * Validates the input commission request object.
     * @param {Object} commission - The commission request object.
     * @returns {boolean} - Returns true if valid, false otherwise.
     */
    validateCommission(commission) {
        if (!commission.title || !commission.client || !commission.details) {
            return false;
        }
        // Add any additional validation logic here
        return true;
    }

    /**
     * Intake a new commission request.
     * @param {Object} commission - The commission request object.
     * @returns {void}
     * @throws {Error} - Throws an error if the commission is invalid.
     */
    intakeCommission(commission) {
        if (!this.validateCommission(commission)) {
            throw new Error('Invalid commission request');
        }
        this.queue.addCommission(commission);
    }
}

module.exports = CommissionIntake;