/**
 * Class representing a work receipt.
 * A work receipt contains details about a completed task, including a unique identifier,
 * the associated proof of work, timestamps, and metadata for verification purposes.
 */
class WorkReceipt {
    /**
     * Create a work receipt.
     * @param {string} id - The unique identifier for the work receipt.
     * @param {string} proof - The proof of work associated with this receipt.
     * @param {Date} timestamp - The time when the work was completed.
     * @param {Object} metadata - Additional metadata regarding the work.
     */
    constructor(id, proof, timestamp, metadata) {
        this.id = id;
        this.proof = proof;
        this.timestamp = timestamp;
        this.metadata = metadata;
    }

    /**
     * Retrieves the unique ID of the work receipt.
     * @returns {string} The unique identifier of the work receipt.
     */
    getId() {
        return this.id;
    }

    /**
     * Retrieves the proof of work.
     * @returns {string} The proof associated with the receipt.
     */
    getProof() {
        return this.proof;
    }

    /**
     * Retrieves the timestamp of when the work was completed.
     * @returns {Date} The timestamp of the work completion.
     */
    getTimestamp() {
        return this.timestamp;
    }

    /**
     * Retrieves the metadata of the work receipt.
     * @returns {Object} The metadata associated with the receipt.
     */
    getMetadata() {
        return this.metadata;
    }

    /**
     * Converts the work receipt to a JSON representation.
     * @returns {Object} The JSON representation of the work receipt.
     */
    toJSON() {
        return {
            id: this.id,
            proof: this.proof,
            timestamp: this.timestamp.toISOString(),
            metadata: this.metadata
        };
    }
}

module.exports = WorkReceipt;
