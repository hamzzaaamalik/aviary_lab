/**
 * WorldOrchestrator class to manage the orchestration of the living world.
 * This module integrates various subsystems to facilitate a cohesive world experience.
 * @module WorldOrchestrator
 */

class WorldOrchestrator {
    constructor() {
        this.modules = [];
    }

    /**
     * Registers a new module in the orchestrator.
     * @param {Object} module - The module to be registered.
     * @throws {Error} If module is invalid.
     */
    registerModule(module) {
        if (!module || typeof module.run !== 'function') {
            throw new Error('Invalid module. Must have a run method.');
        }
        this.modules.push(module);
    }

    /**
     * Executes all registered modules in sequence.
     * @returns {Promise<void>} Resolves when all modules have run.
     */
    async run() {
        for (const module of this.modules) {
            try {
                await module.run();
            } catch (error) {
                console.error(`Error executing module: ${module.constructor.name}`, error);
            }
        }
    }

    /**
     * Initializes all registered modules.
     * @returns {Promise<void>} Resolves when all modules have been initialized.
     */
    async initialize() {
        for (const module of this.modules) {
            if (typeof module.initialize === 'function') {
                await module.initialize();
            }
        }
    }
}

export default WorldOrchestrator;
