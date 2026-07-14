/**
 * CommissionQueue.js
 * 
 * This class manages the queue of commission requests. It handles adding new requests, processing them,
 * and managing the status of each commission in the queue.
 * 
 * @class CommissionQueue
 */
class CommissionQueue {
    constructor() {
        this.queue = [];
        this.currentCommissionId = 0;
    }

    /**
     * Adds a new commission to the queue.
     * 
     * @param {Object} commission - The commission request.
     * @param {string} commission.description - Description of the commission.
     * @param {string} commission.clientId - The ID of the client requesting the commission.
     * @returns {number} The ID of the newly added commission.
     */
    addCommission(commission) {
        if (!commission || !commission.description || !commission.clientId) {
            throw new Error('Invalid commission object.');
        }

        const commissionId = this.currentCommissionId++;
        this.queue.push({ id: commissionId, ...commission, status: 'pending' });
        return commissionId;
    }

    /**
     * Processes the next commission in the queue.
     * 
     * @returns {Object|null} The processed commission or null if the queue is empty.
     */
    processNext() {
        if (this.queue.length === 0) return null;

        const commission = this.queue.shift();
        commission.status = 'processing';
        // Simulate processing logic here. Use a real implementation in production.
        // After processing, update the status accordingly.
        commission.status = 'completed';
        return commission;
    }

    /**
     * Retrieves the current status of all commissions in the queue.
     * 
     * @returns {Array} The list of commissions with their statuses.
     */
    getCommissionStatuses() {
        return this.queue.map(commission => ({ id: commission.id, status: commission.status }));
    }
}

module.exports = CommissionQueue;