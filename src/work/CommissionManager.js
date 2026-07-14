/**
 * CommissionManager handles the intake and processing of commissions.
 * It manages the job queue and execution pipeline for efficient handling.
 *
 * @module CommissionManager
 */

const CommissionIntake = require('./CommissionIntake');
const JobQueue = require('./JobQueue');
const JobExecutionPipeline = require('./JobExecutionPipeline');

class CommissionManager {
    constructor() {
        this.jobQueue = new JobQueue();
        this.executionPipeline = new JobExecutionPipeline();
    }

    /**
     * Intake a new commission and add it to the job queue.
     * @param {Object} commission - The commission object to be processed.
     * @returns {boolean} - Success status of the intake operation.
     */
    intakeCommission(commission) {
        const success = CommissionIntake.validate(commission);
        if (success) {
            this.jobQueue.addJob(commission);
            return true;
        }
        return false;
    }

    /**
     * Process the next commission from the job queue using the execution pipeline.
     * @returns {Promise<void>} - Promise resolving when the job is processed.
     */
    async processNextCommission() {
        const job = this.jobQueue.getNextJob();
        if (job) {
            await this.executionPipeline.execute(job);
        } else {
            console.log('No jobs in the queue to process.');
        }
    }

    /**
     * Get the status of the current job queue.
     * @returns {Array} - The current list of jobs in the queue.
     */
    getJobQueueStatus() {
        return this.jobQueue.getJobs();
    }
}

module.exports = CommissionManager;