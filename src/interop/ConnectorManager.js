// src/interop/ConnectorManager.js

/**
 * ConnectorManager manages the connections and protocols for external integrations.
 * Handles the initialization and lifecycle of connectors.
 */
class ConnectorManager {
    constructor() {
        this.connectors = new Map();
    }

    /**
     * Register a new connector.
     * @param {string} name - The name of the connector.
     * @param {Connector} connector - The connector instance.
     * @throws Will throw an error if the connector name already exists.
     */
    registerConnector(name, connector) {
        if (this.connectors.has(name)) {
            throw new Error(`Connector with name '${name}' already registered.`);
        }
        this.connectors.set(name, connector);
    }

    /**
     * Unregister a connector by name.
     * @param {string} name - The name of the connector to unregister.
     * @throws Will throw an error if the connector name does not exist.
     */
    unregisterConnector(name) {
        if (!this.connectors.has(name)) {
            throw new Error(`Connector with name '${name}' does not exist.`);
        }
        this.connectors.delete(name);
    }

    /**
     * Retrieve a connector by name.
     * @param {string} name - The name of the connector to retrieve.
     * @returns {Connector} - The connector instance.
     * @throws Will throw an error if the connector name does not exist.
     */
    getConnector(name) {
        if (!this.connectors.has(name)) {
            throw new Error(`Connector with name '${name}' does not exist.`);
        }
        return this.connectors.get(name);
    }

    /**
     * Initialize all registered connectors.
     * @returns {Promise<void>} - Resolves when all connectors are initialized.
     */
    async initializeConnectors() {
        const initPromises = Array.from(this.connectors.values()).map(connector => connector.initialize());
        await Promise.all(initPromises);
    }
}

module.exports = ConnectorManager;
