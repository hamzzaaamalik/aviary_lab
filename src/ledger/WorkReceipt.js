/**
 * WorkReceipt class to encapsulate the proof of work done.
 * Each WorkReceipt instance represents a unit of work, containing its hash, timestamp, and metadata.
 */
class WorkReceipt {
    /**
     * @param {Object} data - The data associated with the work receipt.
     * @param {string} data.workId - Unique identifier for the work.
     * @param {string} data.workerId - Identifier for the entity that performed the work.
     * @param {string} data.result - The result of the work performed.
     * @param {number} data.timestamp - Timestamp of when the work was completed.
     */
    constructor(data) {
        this.workId = data.workId;
        this.workerId = data.workerId;
        this.result = data.result;
        this.timestamp = data.timestamp;
        this.hash = this.generateHash();
    }

    /**
     * Generates a hash for the work receipt using the workId and timestamp.
     * @returns {string} - The generated hash.
     */
    generateHash() {
        const input = `${this.workId}${this.timestamp}`;
        // Simple hash function for demonstration; replace with a cryptographic hash in production.
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash = (hash << 5) - hash + input.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }

    /**
     * Validates the work receipt against its hash.
     * @returns {boolean} - True if the hash matches the generated hash, else false.
     */
    validate() {
        return this.hash === this.generateHash();
    }

    /**
     * Serializes the work receipt to a JSON object.
     * @returns {Object} - JSON representation of the work receipt.
     */
    toJSON() {
        return {
            workId: this.workId,
            workerId: this.workerId,
            result: this.result,
            timestamp: this.timestamp,
            hash: this.hash
        };
    }
}

module.exports = WorkReceipt;