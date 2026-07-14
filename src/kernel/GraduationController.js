/**
 * GraduationController.js
 * Handles the coordination of the Graduation lifecycle, integrating various modules
 * to ensure a seamless transition through the perceive → think → act loop.
 *
 * @module GraduationController
 * @requires GraduationManager
 * @requires PerceiveThinkActLoop
 * @requires GraduationEventHandler
 * @requires GraduationExecutor
 */

const GraduationManager = require('./GraduationManager');
const PerceiveThinkActLoop = require('./PerceiveThinkActLoop');
const GraduationEventHandler = require('./GraduationEventHandler');
const GraduationExecutor = require('./GraduationExecutor');

class GraduationController {
    /**
     * Initializes the GraduationController with necessary components.
     *
     * @param {Object} options - Configuration options for the controller.
     */
    constructor(options) {
        this.graduationManager = new GraduationManager(options);
        this.perceiveThinkActLoop = new PerceiveThinkActLoop();
        this.eventHandler = new GraduationEventHandler();
        this.executor = new GraduationExecutor();
    }

    /**
     * Starts the Graduation process by initiating the perceive → think → act loop.
     */
    startGraduation() {
        this.perceiveThinkActLoop.start(this.graduationManager);
    }

    /**
     * Handles incoming events relevant to the Graduation process.
     *
     * @param {Object} event - The event object to handle.
     */
    handleEvent(event) {
        const isHandled = this.eventHandler.processEvent(event);
        if (isHandled) {
            this.executor.execute(this.graduationManager);
        }
    }

    /**
     * Stops the Graduation process gracefully.
     */
    stopGraduation() {
        this.perceiveThinkActLoop.stop();
    }
}

module.exports = GraduationController;
