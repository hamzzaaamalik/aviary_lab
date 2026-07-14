/**
 * ProtocolAdapter class for managing inter-system communication protocols.
 * This class handles the registration of protocols and the routing of messages
 * between different systems using those protocols.
 */
class ProtocolAdapter {
    constructor() {
        this.protocols = {};
    }

    /**
     * Registers a new communication protocol.
     * @param {string} protocolName - The name of the protocol.
     * @param {Object} protocolDefinition - The definition of the protocol including methods and handlers.
     */
    registerProtocol(protocolName, protocolDefinition) {
        if (this.protocols[protocolName]) {
            throw new Error(`Protocol ${protocolName} is already registered.`);
        }
        this.protocols[protocolName] = protocolDefinition;
    }

    /**
     * Sends a message using the specified protocol.
     * @param {string} protocolName - The name of the protocol to use.
     * @param {Object} message - The message to send.
     * @throws Will throw an error if the protocol is not registered.
     */
    sendMessage(protocolName, message) {
        const protocol = this.protocols[protocolName];
        if (!protocol) {
            throw new Error(`Protocol ${protocolName} is not registered.`);
        }
        protocol.send(message);
    }

    /**
     * Receives a message using the specified protocol.
     * @param {string} protocolName - The name of the protocol to use.
     * @param {Object} message - The incoming message.
     * @throws Will throw an error if the protocol is not registered.
     */
    receiveMessage(protocolName, message) {
        const protocol = this.protocols[protocolName];
        if (!protocol) {
            throw new Error(`Protocol ${protocolName} is not registered.`);
        }
        protocol.receive(message);
    }
}

export default ProtocolAdapter;