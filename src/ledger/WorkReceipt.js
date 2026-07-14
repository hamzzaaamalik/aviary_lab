/**
 * WorkReceipt class represents a verifiable receipt for work performed.
 * It includes details about the work, timestamp, and a unique hash for integrity.
 */
class WorkReceipt {
    constructor(workId, performerId, details) {
        this.workId = workId; // unique identifier for the work
        this.performerId = performerId; // unique identifier for the performer
        this.details = details; // description or details of the work
        this.timestamp = new Date(); // time when the work was completed
        this.hash = this.generateHash(); // hash for integrity verification
    }

    /**
     * Generates a unique hash for the work receipt
     * @returns {string} - The generated hash
     */
    generateHash() {
        const data = `${this.workId}-${this.performerId}-${this.timestamp.toISOString()}-${JSON.stringify(this.details)}`;
        return this.hashString(data);
    }

    /**
     * Simple hashing function (for demonstration, consider using a better hashing algorithm in production).
     * @param {string} str - The input string to hash
     * @returns {string} - A simple hash value
     */
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }

    /**
     * Validates the receipt by checking the hash against the details.
     * @returns {boolean} - True if valid, false otherwise
     */
    validate() {
        return this.hash === this.generateHash();
    }

    /**
     * Returns the details of the work receipt as an object.
     * @returns {Object} - The receipt details
     */
    getDetails() {
        return {
            workId: this.workId,
            performerId: this.performerId,
            details: this.details,
            timestamp: this.timestamp,
            hash: this.hash,
        };
    }
}

module.exports = WorkReceipt;
