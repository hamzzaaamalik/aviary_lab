/**
 * Class representing a Job Queue for handling commissions.
 */
class JobQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    /**
     * Add a job to the queue.
     * @param {Function} job - The job function to add.
     * @throws {Error} If job is not a function.
     */
    addJob(job) {
        if (typeof job !== 'function') {
            throw new Error('Job must be a function');
        }
        this.queue.push(job);
        this.processQueue();
    }

    /**
     * Process the next job in the queue.
     * @returns {Promise<void>} Resolves when the job is complete.
     */
    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) {
            return;
        }

        this.isProcessing = true;
        const job = this.queue.shift();
        try {
            await job(); // Execute the job
        } catch (error) {
            console.error('Job failed:', error);
        } finally {
            this.isProcessing = false;
            this.processQueue(); // Process next job
        }
    }

    /**
     * Get the current length of the job queue.
     * @returns {number} The number of jobs in the queue.
     */
    length() {
        return this.queue.length;
    }
}

export default JobQueue;