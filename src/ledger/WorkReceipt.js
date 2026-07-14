// WorkReceipt.js
// A module for creating and verifying work receipts for completed tasks.

class WorkReceipt {
    /**
     * @param {string} id - Unique identifier for the receipt.
     * @param {string} workerId - Identifier for the worker completing the task.
     * @param {string} taskId - Identifier for the task.
     * @param {Date} timestamp - Timestamp of when the task was completed.
     * @param {Object} details - Additional details about the work completed.
     */
    constructor(id, workerId, taskId, timestamp, details) {
        this.id = id;
        this.workerId = workerId;
        this.taskId = taskId;
        this.timestamp = timestamp;
        this.details = details;
    }

    /**
     * Generates a unique hash for the receipt based on its properties.
     * @returns {string} - A hashed value representing the receipt.
     */
    generateHash() {
        const data = `${this.id}${this.workerId}${this.taskId}${this.timestamp}${JSON.stringify(this.details)}`;
        return this._hash(data);
    }

    /**
     * Simple hash function for demonstration. In a real application, use a robust hashing algorithm.
     * @param {string} data - Data to hash.
     * @returns {string} - Hashed representation of the data.
     */
    _hash(data) {
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = (hash << 5) - hash + data.charCodeAt(i);
            hash |= 0;  // Convert to 32bit integer
        }
        return hash.toString();
    }

    /**
     * Validates the receipt to ensure all required fields are present.
     * @returns {boolean} - True if valid, false otherwise.
     */
    isValid() {
        return !!(this.id && this.workerId && this.taskId && this.timestamp);
    }
}

module.exports = WorkReceipt;
