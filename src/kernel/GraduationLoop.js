// GraduationLoop.js
// The core loop for graduation processing, orchestrating the flow between modules.

const EventBus = require('./EventBus');
const GraduationProcessor = require('./GraduationProcessor');
const GraduationManager = require('./GraduationManager');
const GraduationCoordinator = require('./GraduationCoordinator');

/**
 * Class representing the Graduation Loop.
 */
class GraduationLoop {
    constructor() {
        this.eventBus = new EventBus();
        this.processor = new GraduationProcessor(this.eventBus);
        this.manager = new GraduationManager(this.eventBus);
        this.coordinator = new GraduationCoordinator(this.eventBus);
        this.isRunning = false;
    }

    /**
     * Starts the graduation loop, initializing all components and starting the event processing.
     */
    start() {
        if (this.isRunning) {
            throw new Error('GraduationLoop is already running.');
        }
        this.isRunning = true;
        this.eventBus.subscribe('graduation.start', this.processGraduation.bind(this));
        this.eventBus.publish('graduation.start');
    }

    /**
     * Stops the graduation loop, cleaning up resources.
     */
    stop() {
        if (!this.isRunning) {
            throw new Error('GraduationLoop is not running.');
        }
        this.isRunning = false;
        this.eventBus.unsubscribe('graduation.start', this.processGraduation.bind(this));
    }

    /**
     * Processes the graduation logic by invoking the processor and manager.
     * @param {Object} event - The event data.
     */
    processGraduation(event) {
        try {
            const graduationData = this.processor.process(event);
            this.manager.manage(graduationData);
            this.coordinator.coordinate(graduationData);
        } catch (error) {
            console.error('Error processing graduation:', error);
        }
    }
}

module.exports = GraduationLoop;