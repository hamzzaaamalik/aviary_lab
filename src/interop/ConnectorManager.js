/**
 * ConnectorManager.js
 * 
 * This module manages the lifecycle and operations of various connectors that interface with external systems.
 * It is responsible for initializing connectors, handling data communication, and ensuring proper error handling.
 * 
 * @module interop/ConnectorManager
 */

class ConnectorManager {
    constructor() {
        this.connectors = {};
    }
    
    /**
     * Registers a new connector.
     * 
     * @param {string} name - The unique name of the connector.
     * @param {Connector} connector - An instance of the connector to register.
     * @throws {Error} If the connector is already registered.
     */
    registerConnector(name, connector) {
        if (this.connectors[name]) {
            throw new Error(`Connector ${name} is already registered.`);
        }
        this.connectors[name] = connector;
    }
    
    /**
     * Initializes all registered connectors.
     * 
     * @returns {Promise<void>} A promise that resolves when all connectors are initialized.
     */
    async initializeConnectors() {
        const initPromises = Object.values(this.connectors).map(connector => connector.initialize());
        await Promise.all(initPromises);
    }
    
    /**
     * Sends data to a specified connector.
     * 
     * @param {string} name - The name of the connector to send data to.
     * @param {*} data - The data to send through the connector.
     * @throws {Error} If the connector is not found.
     */
    sendData(name, data) {
        const connector = this.connectors[name];
        if (!connector) {
            throw new Error(`Connector ${name} not found.`);
        }
        connector.send(data);
    }
    
    /**
     * Retrieves data from a specified connector.
     * 
     * @param {string} name - The name of the connector to retrieve data from.
     * @returns {*} The data retrieved from the connector.
     * @throws {Error} If the connector is not found.
     */
    retrieveData(name) {
        const connector = this.connectors[name];
        if (!connector) {
            throw new Error(`Connector ${name} not found.`);
        }
        return connector.retrieve();
    }
}

export default ConnectorManager;
