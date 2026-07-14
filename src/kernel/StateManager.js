/**
 * StateManager class to handle the state of the PROTO system.
 * Responsible for maintaining and updating the current state during
 * the perceive→think→act loop.
 */
class StateManager {
    constructor() {
        this.state = {};
    }

    /**
     * Initializes the state with default values.
     * @param {Object} defaults - The default state values.
     */
    initializeState(defaults) {
        this.state = { ...defaults };
    }

    /**
     * Updates a specific key in the state.
     * @param {string} key - The key to update in the state.
     * @param {*} value - The new value to set for the key.
     */
    updateState(key, value) {
        if (!key) throw new Error('Key must be provided.');
        this.state[key] = value;
    }

    /**
     * Retrieves the current value of a specific key in the state.
     * @param {string} key - The key to retrieve from the state.
     * @returns {*} - The current value of the key.
     */
    getState(key) {
        if (key in this.state) {
            return this.state[key];
        }
        throw new Error(`State key '${key}' does not exist.`);
    }

    /**
     * Resets the state to default values.
     */
    resetState() {
        this.state = {};
    }
}

module.exports = StateManager;