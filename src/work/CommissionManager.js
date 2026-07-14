/**
 * CommissionManager handles the intake, processing, and management of commission requests.
 * It interacts with the JobQueue and processes incoming commissions through the JobExecutionPipeline.
 */
class CommissionManager {
    constructor(jobQueue, jobExecutionPipeline) {
        this.jobQueue = jobQueue;
        this.jobExecutionPipeline = jobExecutionPipeline;
    }

    /**
     * Intake a new commission request and add it to the job queue.
     * @param {Object} commission - The commission object containing details about the request.
     * @param {string} commission.id - Unique identifier for the commission.
     * @param {Object} commission.data - The data associated with the commission request.
     */
    intakeCommission(commission) {
        if (!commission || !commission.id || !commission.data) {
            throw new Error('Invalid commission data.');
        }
        this.jobQueue.enqueue(commission);
        console.log(`Commission ${commission.id} has been intaken.`);
    }

    /**
     * Process the next commission from the job queue.
     */
    processNextCommission() {
        const nextCommission = this.jobQueue.dequeue();
        if (!nextCommission) {
            console.log('No commissions in the queue to process.');
            return;
        }
        console.log(`Processing commission ${nextCommission.id}...`);
        this.jobExecutionPipeline.execute(nextCommission);
    }

    /**
     * Get the current status of commissions in the manager.
     * @returns {Array} - List of commissions being managed.
     */
    getStatus() {
        return this.jobQueue.getAllItems();
    }
}

module.exports = CommissionManager;