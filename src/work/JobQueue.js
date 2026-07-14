// JobQueue.js
// This module manages a queue of jobs, including commission processing.

class JobQueue {
    constructor() {
        this.jobs = [];
    }

    /**
     * Adds a new job to the queue.
     * @param {Object} job - The job object to be added to the queue.
     * @returns {void}
     */
    addJob(job) {
        if (!this.validateJob(job)) {
            throw new Error('Invalid job object.');
        }
        this.jobs.push(job);
    }

    /**
     * Validates the job object structure.
     * @param {Object} job - The job object to validate.
     * @returns {boolean}
     */
    validateJob(job) {
        return job && typeof job.id === 'string' && typeof job.type === 'string';
    }

    /**
     * Retrieves the next job in the queue without removing it.
     * @returns {Object|null} - The next job object or null if the queue is empty.
     */
    peek() {
        return this.jobs.length > 0 ? this.jobs[0] : null;
    }

    /**
     * Removes and returns the next job from the queue.
     * @returns {Object|null} - The removed job object or null if the queue is empty.
     */
    pop() {
        return this.jobs.shift() || null;
    }

    /**
     * Clears all jobs from the queue.
     * @returns {void}
     */
    clear() {
        this.jobs = [];
    }

    /**
     * Returns the current size of the job queue.
     * @returns {number} - Total number of jobs in the queue.
     */
    size() {
        return this.jobs.length;
    }

    /**
     * Retrieves jobs associated with commissions.
     * @returns {Array} - Array of commission jobs.
     */
    getCommissionJobs() {
        return this.jobs.filter(job => job.type === 'commission');
    }
}

export default JobQueue;