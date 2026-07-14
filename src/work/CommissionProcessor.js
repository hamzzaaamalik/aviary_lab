/**
 * CommissionProcessor - Handles the processing of commission requests.
 *
 * This module takes in commission requests from the JobQueue, processes them,
 * and forwards the results to the appropriate handlers for execution.
 * It ensures that each commission is validated, and error handling is implemented.
 *
 * @module CommissionProcessor
 */

const JobQueue = require('./JobQueue');
const CommissionHandler = require('./CommissionHandler');

class CommissionProcessor {
    constructor() {
        this.jobQueue = new JobQueue();
    }

    /**
     * Processes the next commission in the job queue.
     * @returns {Promise<void>} - Resolves when the commission is processed.
     */
    async processNextCommission() {
        try {
            const commission = this.jobQueue.getNextJob();
            if (!commission) {
                console.log('No commissions to process.');
                return;
            }

            console.log(`Processing commission: ${commission.id}`);
            this.validateCommission(commission);
            await CommissionHandler.handleCommission(commission);
            console.log(`Commission ${commission.id} processed successfully.`);
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Validates the commission to ensure it meets all requirements.
     * @param {Object} commission - The commission to validate.
     * @throws {Error} - Throws if validation fails.
     */
    validateCommission(commission) {
        if (!commission.id || !commission.details) {
            throw new Error('Invalid commission: Missing required fields.');
        }
        // Additional validation logic can be added here.
    }

    /**
     * Handles errors that occur during commission processing.
     * @param {Error} error - The error to handle.
     */
    handleError(error) {
        console.error('Error processing commission:', error.message);
        // Implement further error handling logic, such as logging or retries.
    }
}

module.exports = CommissionProcessor;
