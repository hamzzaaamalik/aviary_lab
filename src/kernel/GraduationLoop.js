/**
 * GraduationLoop - Manages the perceive-think-act cycle for PROTO.
 * This class orchestrates the perception processing, reasoning, and action execution.
 *
 * @module GraduationLoop
 */

const EventBus = require('./EventBus');
const PerceiveThinkActLoop = require('./PerceiveThinkActLoop');
const StateManager = require('./StateManager');

class GraduationLoop {
    constructor() {
        this.eventBus = new EventBus();
        this.stateManager = new StateManager();
        this.ptaLoop = new PerceiveThinkActLoop(this.eventBus, this.stateManager);
    }

    /**
     * Starts the Graduation Loop, initializing the necessary components.
     * @returns {void}
     */
    start() {
        this.eventBus.subscribe('perceptionComplete', this.ptaLoop.process.bind(this.ptaLoop));
        this.eventBus.subscribe('actionComplete', this.handleActionComplete.bind(this));
        this.scheduleNextPerception();
    }

    /**
     * Schedules the next perception cycle.
     * @returns {void}
     */
    scheduleNextPerception() {
        setTimeout(() => {
            this.eventBus.publish('startPerception');
            this.scheduleNextPerception();
        }, 1000); // adjust the timing as needed
    }

    /**
     * Handles the completion of an action.
     * @param {Object} actionResult - The result of the action.
     * @returns {void}
     */
    handleActionComplete(actionResult) {
        console.log('Action completed:', actionResult);
        this.stateManager.update(actionResult);
    }
}

module.exports = GraduationLoop;
