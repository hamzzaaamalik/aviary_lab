/**
 * AgentIdentity.js
 * 
 * This module manages the identity aspects of agents within the system. 
 * It handles the assignment of unique identifiers, maintains essential agent metadata, 
 * and ensures consistency across the agent lifecycle.
 * 
 * @module AgentIdentity
 */

class AgentIdentity {
    /**
     * Constructs an instance of AgentIdentity.
     * @param {string} id - A unique identifier for the agent.
     * @param {string} name - The name of the agent.
     * @param {Object} attributes - Additional attributes associated with the agent.
     */
    constructor(id, name, attributes) {
        this.id = id;
        this.name = name;
        this.attributes = attributes || {};
    }

    /**
     * Get the agent's unique identifier.
     * @returns {string} The agent's ID.
     */
    getId() {
        return this.id;
    }

    /**
     * Get the agent's name.
     * @returns {string} The agent's name.
     */
    getName() {
        return this.name;
    }

    /**
     * Get the agent's attributes.
     * @returns {Object} The agent's attributes.
     */
    getAttributes() {
        return this.attributes;
    }

    /**
     * Update the agent's attributes.
     * @param {Object} newAttributes - An object containing new attributes to update.
     */
    updateAttributes(newAttributes) {
        this.attributes = { ...this.attributes, ...newAttributes };
    }

    /**
     * Returns a string representation of the AgentIdentity instance.
     * @returns {string} A string describing the agent.
     */
    toString() {
        return `AgentIdentity { id: ${this.id}, name: ${this.name}, attributes: ${JSON.stringify(this.attributes)} }`;
    }
}

module.exports = AgentIdentity;