/**
 * WorldOrchestrator.js
 *
 * This module is responsible for managing and orchestrating the various components of the world,
 * ensuring that all systems work together harmoniously to create a self-sustaining ecosystem.
 *
 * @module WorldOrchestrator
 */

class WorldOrchestrator {
    constructor() {
        this.agents = [];
        this.resources = new Map();
        this.eventBus = new EventBus();
    }

    /**
     * Initializes the world by setting up the necessary components.
     */
    initialize() {
        this.eventBus.initialize();
        this.setupInitialResources();
    }

    /**
     * Sets up initial resources required for the world to function.
     * @private
     */
    setupInitialResources() {
        this.resources.set('energy', 1000);
        this.resources.set('food', 500);
    }

    /**
     * Adds an agent to the world.
     * @param {Agent} agent - The agent to be added.
     */
    addAgent(agent) {
        this.agents.push(agent);
        this.eventBus.publish('agentAdded', agent);
    }

    /**
     * Removes an agent from the world.
     * @param {Agent} agent - The agent to be removed.
     */
    removeAgent(agent) {
        this.agents = this.agents.filter(a => a !== agent);
        this.eventBus.publish('agentRemoved', agent);
    }

    /**
     * Allocates resources to agents based on their needs.
     */
    allocateResources() {
        for (const agent of this.agents) {
            const neededResource = agent.requestResources();
            if (this.resources.get(neededResource) > 0) {
                this.resources.set(neededResource, this.resources.get(neededResource) - 1);
                agent.receiveResources(neededResource);
            }
        }
    }

    /**
     * Runs the main loop, orchestrating the world's activities.
     */
    run() {
        this.initialize();
        setInterval(() => {
            this.allocateResources();
            this.eventBus.publish('worldTick', this);
        }, 1000);
    }
}

export default WorldOrchestrator;
