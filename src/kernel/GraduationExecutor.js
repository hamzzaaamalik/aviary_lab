/**
 * GraduationExecutor class manages the execution of graduation events.
 * It coordinates the flow between the event handler and the graduation loop,
 * ensuring that the process runs smoothly and efficiently.
 */
class GraduationExecutor {
    constructor(eventBus, loop) {
        this.eventBus = eventBus;
        this.loop = loop;
        this.isExecuting = false;
    }

    /**
     * Starts the execution process for graduation.
     * Listens for relevant events and triggers the graduation loop.
     */
    start() {
        if (this.isExecuting) return;
        this.isExecuting = true;
        this.eventBus.on('graduation.start', this.handleStart.bind(this));
    }

    /**
     * Stops the execution process.
     */
    stop() {
        this.isExecuting = false;
        this.eventBus.off('graduation.start', this.handleStart.bind(this));
    }

    /**
     * Handles the start of the graduation process.
     * It triggers the graduation loop to begin execution.
     * @param {Object} event - The event object containing graduation details.
     */
    handleStart(event) {
        console.log('Graduation process started:', event);
        this.loop.run(event);
    }

    /**
     * Resets the state of the executor, clearing any existing execution state.
     */
    reset() {
        this.isExecuting = false;
    }
}

// Export the GraduationExecutor class
module.exports = GraduationExecutor;
