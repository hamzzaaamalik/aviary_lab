/**
 * @module CommissionQueue
 * @description A class to manage the job queue for commissions, ensuring that commissions are processed in order.
 */
class CommissionQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    /**
     * Adds a new commission to the queue.
     * @param {Object} commission - The commission to add.
     * @returns {void}
     */
    addCommission(commission) {
        this.queue.push(commission);
        this.processQueue();
    }

    /**
     * Processes the next commission in the queue.
     * If already processing, it will do nothing.
     * @returns {void}
     */
    processQueue() {
        if (this.processing || this.queue.length === 0) {
            return;
        }

        this.processing = true;
        const commission = this.queue.shift();

        // Mock processing of the commission
        console.log('Processing commission:', commission);

        // Simulate async processing
        setTimeout(() => {
            this.completeCommission(commission);
        }, 1000); // Simulate time to process
    }

    /**
     * Called when a commission has been completed.
     * @param {Object} commission - The completed commission.
     * @returns {void}
     */
    completeCommission(commission) {
        console.log('Completed commission:', commission);
        this.processing = false;
        this.processQueue(); // Process the next commission
    }

    /**
     * Returns the current number of commissions in the queue.
     * @returns {number} - The length of the queue.
     */
    getQueueLength() {
        return this.queue.length;
    }
}

module.exports = CommissionQueue;
