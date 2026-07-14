/**
 * The PerceiveThinkActLoop class coordinates the interaction between perception,
 * reasoning, and action modules. It runs in a loop to enable continuous processing
 * of incoming data and decision-making.
 *
 * @class PerceiveThinkActLoop
 */
class PerceiveThinkActLoop {
    constructor(eventBus, moduleRegistry) {
        this.eventBus = eventBus;
        this.moduleRegistry = moduleRegistry;
        this.running = false;
    }

    /**
     * Initializes the loop, setting up necessary event listeners.
     * @returns {void}
     */
    init() {
        this.eventBus.on('signalReceived', this.handleSignal.bind(this));
        this.eventBus.on('actionCompleted', this.handleActionCompletion.bind(this));
    }

    /**
     * Starts the loop for continuous processing.
     * @returns {void}
     */
    start() {
        if (this.running) {
            throw new Error('Loop is already running.');
        }
        this.running = true;
        this.loop();
    }

    /**
     * Stops the loop.
     * @returns {void}
     */
    stop() {
        this.running = false;
    }

    /**
     * The main processing loop that runs at a fixed interval.
     * @returns {void}
     */
    loop() {
        if (!this.running) return;
        this.perceive();
        this.think();
        this.act();
        setTimeout(() => this.loop(), 100); // Adjust the interval as needed
    }

    /**
     * Handles incoming signals by relaying them to the perception module.
     * @param {Object} signal - The signal data received from the event bus.
     * @returns {void}
     */
    handleSignal(signal) {
        const perceptionModule = this.moduleRegistry.get('perception');
        perceptionModule.processSignal(signal);
    }

    /**
     * Handles completion of actions, possibly for logging or triggering new perceptions.
     * @param {Object} action - The completed action data.
     * @returns {void}
     */
    handleActionCompletion(action) {
        // Logic for handling completed actions (e.g., logging, notifying modules)
        console.log('Action completed:', action);
    }

    /**
     * Processes perception data to feed into reasoning.
     * @returns {void}
     */
    perceive() {
        const perceptionModule = this.moduleRegistry.get('perception');
        const data = perceptionModule.getData();
        // Process data as needed.
    }

    /**
     * Conducts reasoning based on perceived data.
     * @returns {void}
     */
    think() {
        const reasoningModule = this.moduleRegistry.get('reasoning');
        reasoningModule.evaluate();
    }

    /**
     * Executes actions based on reasoning results.
     * @returns {void}
     */
    act() {
        const actionModule = this.moduleRegistry.get('action');
        actionModule.perform();
    }
}

module.exports = PerceiveThinkActLoop;
