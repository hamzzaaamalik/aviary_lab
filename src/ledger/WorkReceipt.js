/**
 * Class representing a work receipt.
 */
class WorkReceipt {
    /**
     * Create a work receipt.
     * @param {string} id - Unique identifier for the receipt.
     * @param {string} workId - Identifier of the related work.
     * @param {Date} timestamp - Time when the work was completed.
     * @param {Object} proof - Proof of work completion.
     */
    constructor(id, workId, timestamp, proof) {
        this.id = id;
        this.workId = workId;
        this.timestamp = timestamp;
        this.proof = proof;
        this.validate();
    }

    /**
     * Validate receipt properties.
     * @throws {Error} If validation fails.
     */
    validate() {
        if (!this.id || typeof this.id !== 'string') {
            throw new Error('Invalid receipt id.');
        }
        if (!this.workId || typeof this.workId !== 'string') {
            throw new Error('Invalid work id.');
        }
        if (!(this.timestamp instanceof Date)) {
            throw new Error('Invalid timestamp.');
        }
        if (typeof this.proof !== 'object' || this.proof === null) {
            throw new Error('Invalid proof object.');
        }
    }

    /**
     * Convert the work receipt to a JSON object.
     * @returns {Object} JSON representation of the receipt.
     */
    toJSON() {
        return {
            id: this.id,
            workId: this.workId,
            timestamp: this.timestamp.toISOString(),
            proof: this.proof,
        };
    }
}

module.exports = WorkReceipt;

/**
 * Generates a work receipt and returns it.
 * @param {string} workId - Identifier of the related work.
 * @param {Object} proof - Proof of work completion.
 * @returns {WorkReceipt} The generated work receipt.
 */
function generateWorkReceipt(workId, proof) {
    const receiptId = `receipt-${Date.now()}`;
    const receiptTimestamp = new Date();
    return new WorkReceipt(receiptId, workId, receiptTimestamp, proof);
}

module.exports.generateWorkReceipt = generateWorkReceipt;
