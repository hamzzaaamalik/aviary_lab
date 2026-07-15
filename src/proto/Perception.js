// src/proto/Perception.js

/**
 * Perception class handles basic sensory input handling.
 */
export class Perception {
    constructor() {
        this.sensoryData = {};
    }

    /**
     * Adds sensory data to the perception module.
     * @param {string} type - The type of sensory input (e.g., 'sight', 'sound').
     * @param {any} data - The actual data from the sensory input.
     */
    addSensoryData(type, data) {
        if (typeof type !== 'string') {
            throw new TypeError('Type must be a string.');
        }
        this.sensoryData[type] = data;
    }

    /**
     * Retrieves sensory data by type.
     * @param {string} type - The type of sensory input to retrieve.
     * @returns {any} - The corresponding sensory data.
     * @throws {Error} - If the sensory type does not exist.
     */
    getSensoryData(type) {
        if (!(type in this.sensoryData)) {
            throw new Error(`No sensory data of type: ${type}`);
        }
        return this.sensoryData[type];
    }
}