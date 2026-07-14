/**
 * MessagingConnector handles the communication between PROTO and external messaging systems.
 * It manages sending and receiving messages, ensuring proper serialization and deserialization.
 * 
 * @module MessagingConnector
 */

class MessagingConnector {
    constructor() {
        this.messageQueue = [];
        this.connected = false;
    }

    /**
     * Connects to the external messaging system.
     * @returns {Promise<void>} - Resolves when connected.
     */
    async connect() {
        // Simulate connection to external messaging system
        this.connected = true;
        console.log('Connected to the messaging system.');
    }

    /**
     * Disconnects from the external messaging system.
     * @returns {Promise<void>} - Resolves when disconnected.
     */
    async disconnect() {
        // Simulate disconnection
        this.connected = false;
        console.log('Disconnected from the messaging system.');
    }

    /**
     * Sends a message to the external system.
     * @param {Object} message - The message to send.
     * @throws {Error} - Throws error if not connected.
     */
    sendMessage(message) {
        if (!this.connected) {
            throw new Error('Not connected to the messaging system.');
        }
        this.messageQueue.push(this.serializeMessage(message));
        console.log('Message sent:', message);
    }

    /**
     * Receives a message from the external system.
     * @param {string} rawMessage - The raw message received.
     * @returns {Object} - The deserialized message.
     */
    receiveMessage(rawMessage) {
        const message = this.deserializeMessage(rawMessage);
        console.log('Message received:', message);
        return message;
    }

    /**
     * Serializes the message for transmission.
     * @param {Object} message - The message to serialize.
     * @returns {string} - The serialized message.
     */
    serializeMessage(message) {
        return JSON.stringify(message);
    }

    /**
     * Deserializes the incoming message.
     * @param {string} rawMessage - The raw message to deserialize.
     * @returns {Object} - The deserialized message.
     */
    deserializeMessage(rawMessage) {
        return JSON.parse(rawMessage);
    }
}

module.exports = MessagingConnector;