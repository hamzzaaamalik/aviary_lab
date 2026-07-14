/**
 * @module AuditLog
 * A module for maintaining an append-only audit log that tracks actions and events.
 */

class AuditLog {
    constructor() {
        this.entries = [];
    }

    /**
     * Adds a new entry to the audit log.
     * @param {string} action - The action performed.
     * @param {object} details - Additional details about the action.
     * @throws {Error} Throws an error if action is not a string or details is not an object.
     */
    addEntry(action, details) {
        if (typeof action !== 'string') {
            throw new Error('Action must be a string.');
        }
        if (typeof details !== 'object' || details === null) {
            throw new Error('Details must be a non-null object.');
        }

        const timestamp = new Date().toISOString();
        const entry = { action, details, timestamp };
        this.entries.push(entry);
    }

    /**
     * Retrieves all entries in the audit log.
     * @returns {Array} An array of all audit log entries.
     */
    getEntries() {
        return this.entries;
    }

    /**
     * Clears the audit log. Use with caution!
     * @throws {Error} Throws an error if the log is already empty.
     */
    clearLog() {
        if (this.entries.length === 0) {
            throw new Error('Cannot clear an empty log.');
        }
        this.entries = [];
    }
}

export default AuditLog;