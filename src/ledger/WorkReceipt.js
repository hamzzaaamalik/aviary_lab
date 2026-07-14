/**
 * WorkReceipt class to represent verifiable receipts of completed work.
 * Each receipt contains a unique identifier, the work done, and a hash for verification.
 */
class WorkReceipt {
    /**
     * @param {string} id - Unique identifier for the receipt.
     * @param {string} workDescription - Description of the work completed.
     * @param {string} hash - Hash of the work for verification.
     */
    constructor(id, workDescription, hash) {
        this.id = id;
        this.workDescription = workDescription;
        this.hash = hash;
        this.timestamp = new Date();
    }

    /**
     * Get the unique identifier of the work receipt.
     * @returns {string} - Unique identifier.
     */
    getId() {
        return this.id;
    }

    /**
     * Get the description of the work completed.
     * @returns {string} - Work description.
     */
    getWorkDescription() {
        return this.workDescription;
    }

    /**
     * Get the hash for verification.
     * @returns {string} - Hash of the work.
     */
    getHash() {
        return this.hash;
    }

    /**
     * Get the timestamp of when the receipt was created.
     * @returns {Date} - Creation timestamp.
     */
    getTimestamp() {
        return this.timestamp;
    }

    /**
     * Verifies the receipt by comparing the provided hash with the stored hash.
     * @param {string} hash - The hash to verify against.
     * @returns {boolean} - True if the hashes match, false otherwise.
     */
    verify(hash) {
        return this.hash === hash;
    }
}

module.exports = WorkReceipt;