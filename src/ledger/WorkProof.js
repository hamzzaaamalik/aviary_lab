/**
 * WorkProof.js
 * This module provides a mechanism for creating, validating, and managing work proofs
 * that can be used to verify the completion of tasks or jobs.
 *
 * @module WorkProof
 */

class WorkProof {
    /**
     * Creates an instance of WorkProof.
     * @param {string} workId - Unique identifier for the work.
     * @param {object} proofData - Data to prove the work was completed.
     * @param {Date} timestamp - The time when the work was completed.
     */
    constructor(workId, proofData, timestamp) {
        this.workId = workId;
        this.proofData = proofData;
        this.timestamp = timestamp || new Date();
    }

    /**
     * Validates the work proof data.
     * @returns {boolean} - True if the proof is valid, false otherwise.
     */
    validateProof() {
        // Placeholder for validation logic (e.g., check data integrity)
        return this.proofData && this.workId;
    }

    /**
     * Serializes the proof data into a JSON format for storage.
     * @returns {string} - A JSON string representation of the work proof.
     */
    serialize() {
        return JSON.stringify({
            workId: this.workId,
            proofData: this.proofData,
            timestamp: this.timestamp
        });
    }

    /**
     * Creates a WorkProof instance from a serialized string.
     * @param {string} serializedProof - The serialized work proof string.
     * @returns {WorkProof} - A new WorkProof instance.
     */
    static fromSerialized(serializedProof) {
        const data = JSON.parse(serializedProof);
        return new WorkProof(data.workId, data.proofData, new Date(data.timestamp));
    }
}

module.exports = WorkProof;
