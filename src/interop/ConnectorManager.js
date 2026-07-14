/**
 * ConnectorManager is responsible for managing connections to external systems.
 * It handles the registration and communication with various protocol adapters.
 */
class ConnectorManager {
    constructor() {
        this.connectors = new Map();
    }

    /**
     * Registers a new connector with the specified protocol.
     * @param {string} protocol - The protocol identifier.
     * @param {object} connector - The connector implementation.
     * @throws {Error} If the protocol is already registered.
     */
    registerConnector(protocol, connector) {
        if (this.connectors.has(protocol)) {
            throw new Error(`Connector for protocol ${protocol} is already registered.`);
        }
        this.connectors.set(protocol, connector);
    }

    /**
     * Unregisters a connector for the specified protocol.
     * @param {string} protocol - The protocol identifier.
     * @throws {Error} If the protocol is not registered.
     */
    unregisterConnector(protocol) {
        if (!this.connectors.delete(protocol)) {
            throw new Error(`No connector registered for protocol ${protocol}.`);
        }
    }

    /**
     * Sends data to an external system using the specified protocol.
     * @param {string} protocol - The protocol identifier.
     * @param {object} data - The data to be sent.
     * @returns {Promise} A promise resolving with the response data.
     * @throws {Error} If no connector is registered for the protocol.
     */
    async send(protocol, data) {
        const connector = this.connectors.get(protocol);
        if (!connector) {
            throw new Error(`No connector registered for protocol ${protocol}.`);
        }
        return await connector.send(data);
    }

    /**
     * Receives data from an external system using the specified protocol.
     * @param {string} protocol - The protocol identifier.
     * @returns {Promise} A promise resolving with the received data.
     * @throws {Error} If no connector is registered for the protocol.
     */
    async receive(protocol) {
        const connector = this.connectors.get(protocol);
        if (!connector) {
            throw new Error(`No connector registered for protocol ${protocol}.`);
        }
        return await connector.receive();
    }
}

export default ConnectorManager;