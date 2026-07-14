/**
 * Class representing a job queue for managing commission tasks.
 */
class JobQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    /**
     * Adds a job to the queue.
     * @param {Function} job - The job function to execute.
     * @throws {Error} If job is not a function.
     */
    addJob(job) {
        if (typeof job !== 'function') {
            throw new Error('Job must be a function.');
        }
        this.queue.push(job);
        this.processQueue();
    }

    /**
     * Processes the job queue sequentially.
     * @returns {Promise<void>} A promise that resolves when all jobs are processed.
     */
    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const job = this.queue.shift();
            try {
                await job();
            } catch (error) {
                console.error('Job failed:', error);
            }
        }

        this.isProcessing = false;
    }

    /**
     * Returns the number of jobs in the queue.
     * @returns {number} The number of jobs.
     */
    getJobCount() {
        return this.queue.length;
    }
}

module.exports = JobQueue;