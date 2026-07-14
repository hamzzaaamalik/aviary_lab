/**
 * Class representing the lifecycle of an agent.
 */
class AgentLifecycle {
    /**
     * Create an agent lifecycle.
     * @param {string} id - Unique identifier for the agent.
     */
    constructor(id) {
        this.id = id;
        this.state = 'initialized'; // possible states: initialized, active, inactive, terminated
        this.createdAt = new Date();
    }

    /**
     * Activate the agent, transitioning to 'active' state.
     * @throws {Error} Throws an error if the agent is already active.
     */
    activate() {
        if (this.state === 'active') {
            throw new Error(`Agent ${this.id} is already active.`);
        }
        this.state = 'active';
    }

    /**
     * Deactivate the agent, transitioning to 'inactive' state.
     * @throws {Error} Throws an error if the agent is already inactive.
     */
    deactivate() {
        if (this.state === 'inactive') {
            throw new Error(`Agent ${this.id} is already inactive.`);
        }
        this.state = 'inactive';
    }

    /**
     * Terminate the agent, transitioning to 'terminated' state.
     * @throws {Error} Throws an error if the agent is already terminated.
     */
    terminate() {
        if (this.state === 'terminated') {
            throw new Error(`Agent ${this.id} is already terminated.`);
        }
        this.state = 'terminated';
    }

    /**
     * Get the current state of the agent.
     * @returns {string} The current state of the agent.
     */
    getState() {
        return this.state;
    }

    /**
     * Get the creation timestamp of the agent.
     * @returns {Date} The creation date of the agent.
     */
    getCreationTime() {
        return this.createdAt;
    }
}

module.exports = AgentLifecycle;