/**
 * WorldInteractionOrchestrator.js
 * 
 * This module orchestrates real-time interactions within the world, allowing agents to engage based on events and stimuli detected in their environment.
 * It manages the flow of information and decision-making processes, ensuring that all actions are aligned with the current state of the world.
 * 
 * @module WorldInteractionOrchestrator
 */

const EventBus = require('./EventBus');
const StateManager = require('./StateManager');
const AgentInteractionTracker = require('./AgentInteractionTracker');

class WorldInteractionOrchestrator {
    /**
     * Creates an instance of WorldInteractionOrchestrator.
     * 
     * @param {StateManager} stateManager - The state manager instance to manage world state.
     * @param {AgentInteractionTracker} interactionTracker - The tracker for agent interactions.
     */
    constructor(stateManager, interactionTracker) {
        this.stateManager = stateManager;
        this.interactionTracker = interactionTracker;
        this.eventBus = new EventBus();
        this.initialize();
    }

    /**
     * Initializes the orchestrator, setting up event listeners and state synchronization.
     */
    initialize() {
        this.eventBus.on('worldEvent', (event) => this.handleWorldEvent(event));
        this.eventBus.on('agentAction', (action) => this.trackAgentAction(action));
    }

    /**
     * Handles events occurring in the world, triggering necessary updates and interactions.
     * 
     * @param {Object} event - The event object containing details of the world event.
     */
    handleWorldEvent(event) {
        const worldState = this.stateManager.getCurrentState();
        // Logic to update state based on the event
        // Example: if (event.type === 'weatherChange') {...}
        this.stateManager.updateState(event);
    }

    /**
     * Tracks agent actions to ensure engagement is logged and can be analyzed.
     * 
     * @param {Object} action - The action object containing details of the agent's action.
     */
    trackAgentAction(action) {
        this.interactionTracker.logAction(action);
    }

    /**
     * Starts the orchestrator to begin processing events and actions.
     */
    start() {
        this.eventBus.startListening();
    }

    /**
     * Stops the orchestrator, ceasing all event handling.
     */
    stop() {
        this.eventBus.stopListening();
    }
}

module.exports = WorldInteractionOrchestrator;