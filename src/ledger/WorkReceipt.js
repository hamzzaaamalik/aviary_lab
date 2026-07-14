/**
 * WorkReceipt class represents a verifiable receipt for work done, capturing
 * details of the work, its proof, and related metadata.
 */
class WorkReceipt {
    /**
     * Creates an instance of WorkReceipt.
     * @param {string} workId - The unique identifier for the work.
     * @param {string} proof - A cryptographic proof verifying the work done.
     * @param {Date} timestamp - The date and time when the work was completed.
     * @param {Object} metadata - Additional information related to the work.
     */
    constructor(workId, proof, timestamp, metadata) {
        this.workId = workId;
        this.proof = proof;
        this.timestamp = timestamp;
        this.metadata = metadata;
    }

    /**
     * Validates the proof associated with this work receipt.
     * @returns {boolean} - Returns true if the proof is valid, otherwise false.
     */
    validateProof() {
        // Implement proof validation logic here.
        // This could use cryptographic methods to verify the proof.
        return this.proof !== null && this.proof.length > 0;
    }

    /**
     * Serializes the work receipt to a JSON object.
     * @returns {Object} - The JSON representation of the work receipt.
     */
    toJSON() {
        return {
            workId: this.workId,
            proof: this.proof,
            timestamp: this.timestamp,
            metadata: this.metadata
        };
    }

    /**
     * Deserializes a JSON object to a WorkReceipt instance.
     * @param {Object} json - The JSON representation to deserialize.
     * @returns {WorkReceipt} - The deserialized WorkReceipt instance.
     */
    static fromJSON(json) {
        return new WorkReceipt(json.workId, json.proof, new Date(json.timestamp), json.metadata);
    }
}

module.exports = WorkReceipt;
