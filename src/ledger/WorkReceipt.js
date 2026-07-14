/**
 * WorkReceipt class to create and manage work receipts.
 * A work receipt contains the details of work performed, including a proof of execution.
 * Each receipt is uniquely identified and can be verified for integrity.
 * 
 * @class
 * @classdesc Represents a work receipt for tracking completed tasks.
 */
class WorkReceipt {
    /**
     * Creates a new WorkReceipt instance.
     * 
     * @param {string} id - The unique identifier for the work receipt.
     * @param {string} description - A brief description of the work performed.
     * @param {Date} timestamp - The time when the work was completed.
     * @param {string} proof - The proof of the work completed (e.g., a hash).
     */
    constructor(id, description, timestamp, proof) {
        this.id = id;
        this.description = description;
        this.timestamp = timestamp;
        this.proof = proof;
    }

    /**
     * Validates the work receipt by checking the proof.
     * 
     * @returns {boolean} - Returns true if the receipt is valid, false otherwise.
     */
    validate() {
        // In a real implementation, validation logic would be applied here.
        return this.proof && this.id;
    }

    /**
     * Generates a string representation of the work receipt.
     * 
     * @returns {string} - The string representation of the work receipt.
     */
    toString() {
        return `WorkReceipt { id: ${this.id}, description: ${this.description}, timestamp: ${this.timestamp}, proof: ${this.proof} }`;
    }
}

// Exporting the WorkReceipt class for use in other modules.
module.exports = WorkReceipt;
