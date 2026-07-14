/**
 * OpenFramework class that facilitates integration of external modules
 * with the core system, allowing for enhanced functionality and extensibility.
 *
 * This class provides methods for registering modules, managing dependencies,
 * and ensuring that the core system can communicate with external components.
 *
 * @class OpenFramework
 */
class OpenFramework {
    constructor() {
        this.modules = new Map();
    }

    /**
     * Registers a new module with the OpenFramework.
     *
     * @param {string} name - The name of the module.
     * @param {Object} module - The module object containing functionality.
     * @throws {Error} If a module with the same name already exists.
     */
    registerModule(name, module) {
        if (this.modules.has(name)) {
            throw new Error(`Module ${name} is already registered.`);
        }
        this.modules.set(name, module);
    }

    /**
     * Retrieves a registered module by its name.
     *
     * @param {string} name - The name of the module.
     * @returns {Object} The module object, if found.
     * @throws {Error} If the module is not found.
     */
    getModule(name) {
        if (!this.modules.has(name)) {
            throw new Error(`Module ${name} not found.`);
        }
        return this.modules.get(name);
    }

    /**
     * Unregisters a module from the OpenFramework.
     *
     * @param {string} name - The name of the module to unregister.
     * @throws {Error} If the module is not found.
     */
    unregisterModule(name) {
        if (!this.modules.has(name)) {
            throw new Error(`Module ${name} not found. Cannot unregister.`);
        }
        this.modules.delete(name);
    }

    /**
     * List all registered modules.
     *
     * @returns {Array} An array of registered module names.
     */
    listModules() {
        return Array.from(this.modules.keys());
    }
}

module.exports = OpenFramework;