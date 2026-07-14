/**
 * CommissionPipeline - orchestrates the execution of commission jobs.
 *
 * This class manages the lifecycle of commission jobs, including intake,
 * queuing, and execution. It ensures that jobs are processed in order,
 * handles errors gracefully, and maintains state throughout the process.
 */
class CommissionPipeline {
    constructor() {
        this.jobQueue = [];
        this.isProcessing = false;
    }

    /**
     * Adds a new commission job to the queue.
     * @param {Object} commission - The commission details to be processed.
     * @throws {Error} If the commission object is invalid.
     */
    addJob(commission) {
        if (!this.validateCommission(commission)) {
            throw new Error('Invalid commission object.');
        }
        this.jobQueue.push(commission);
        this.processQueue();
    }

    /**
     * Processes the next job in the queue.
     * If already processing, it will return immediately.
     */
    async processQueue() {
        if (this.isProcessing || this.jobQueue.length === 0) {
            return;
        }
        this.isProcessing = true;

        while (this.jobQueue.length > 0) {
            const commission = this.jobQueue.shift();
            try {
                await this.executeCommission(commission);
            } catch (error) {
                console.error('Error processing commission:', error);
            }
        }

        this.isProcessing = false;
    }

    /**
     * Executes the given commission job.
     * @param {Object} commission - The commission to execute.
     */
    async executeCommission(commission) {
        // Placeholder for execution logic.
        // Implement the logic to handle the commission job here.
        console.log('Executing commission:', commission);
        // Simulate async execution with a delay.
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * Validates the commission object structure.
     * @param {Object} commission - The commission to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    validateCommission(commission) {
        // Basic validation logic (expand as needed).
        return commission && typeof commission.id === 'string';
    }
}

export default CommissionPipeline;