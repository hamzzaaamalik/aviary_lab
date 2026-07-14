/**
 * ConnectionManager is responsible for managing connections to external systems.
 * It handles initiation, maintenance, and closure of connections, ensuring proper
 * error handling and reconnection strategies.
 *
 * @module ConnectionManager
 */

class ConnectionManager {
    /**
     * Creates an instance of ConnectionManager.
     * @constructor
     */
    constructor() {
        this.connections = new Map(); // Store active connections
    }

    /**
     * Initiates a connection to an external system.
     * @param {string} id - Unique identifier for the connection.
     * @param {string} url - The URL of the external system.
     * @returns {Promise<void>} - Resolves when connection is successful.
     * @throws {Error} - Throws an error if connection fails.
     */
    async connect(id, url) {
        if (this.connections.has(id)) {
            throw new Error(`Connection with id ${id} already exists.`);
        }

        try {
            // Simulating connection initiation
            console.log(`Connecting to ${url}...`);
            // Here we should initiate the real connection
            this.connections.set(id, { url, status: 'connected' });
            console.log(`Successfully connected to ${url}`);
        } catch (error) {
            throw new Error(`Failed to connect to ${url}: ${error.message}`);
        }
    }

    /**
     * Closes an existing connection.
     * @param {string} id - The unique identifier for the connection.
     * @returns {Promise<void>} - Resolves when connection is closed.
     * @throws {Error} - Throws an error if the connection does not exist.
     */
    async disconnect(id) {
        if (!this.connections.has(id)) {
            throw new Error(`No connection found with id ${id}.`);
        }

        // Simulating connection closure
        console.log(`Disconnecting from ${this.connections.get(id).url}...`);
        this.connections.delete(id);
        console.log(`Successfully disconnected from connection id ${id}`);
    }

    /**
     * Retrieves the status of the specified connection.
     * @param {string} id - The unique identifier for the connection.
     * @returns {string} - The status of the connection.
     * @throws {Error} - Throws an error if the connection does not exist.
     */
    getConnectionStatus(id) {
        if (!this.connections.has(id)) {
            throw new Error(`No connection found with id ${id}.`);
        }
        return this.connections.get(id).status;
    }
}

module.exports = ConnectionManager;
