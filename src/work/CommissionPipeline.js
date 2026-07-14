/**
 * CommissionPipeline class.
 * Manages the intake and processing of commissions in the system.
 * Provides methods for adding to the job queue and executing jobs.
 */
class CommissionPipeline {
    constructor() {
        this.jobQueue = [];
    }

    /**
     * Adds a new commission request to the job queue.
     * @param {Object} commission - The commission object to add.
     * @param {string} commission.id - Unique identifier for the commission.
     * @param {string} commission.description - Description of the commission.
     * @throws {Error} Throws an error if the commission is missing an id or description.
     */
    addCommission(commission) {
        if (!commission || !commission.id || !commission.description) {
            throw new Error('Invalid commission: missing id or description.');
        }
        this.jobQueue.push(commission);
    }

    /**
     * Processes the next commission in the job queue.
     * @returns {Promise} - Resolves when the commission has been processed.
     */
    async executeNextCommission() {
        if (this.jobQueue.length === 0) {
            throw new Error('No commissions in the queue to process.');
        }
        const commission = this.jobQueue.shift();
        // Simulate processing time
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Processed commission: ${commission.id} - ${commission.description}`);
                resolve();
            }, 1000);
        });
    }

    /**
     * Returns the current job queue.
     * @returns {Array} - The current job queue.
     */
    getQueue() {
        return this.jobQueue;
    }
}

module.exports = CommissionPipeline;
