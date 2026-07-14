/**
 * OpenFramework - A toolkit for integrating with PROTO's core functionalities.
 * This module provides the necessary interfaces and utility functions for developers
 * to build upon the existing capabilities of PROTO.
 *
 * @module OpenFramework
 */

class OpenFramework {
    /**
     * Constructs an instance of OpenFramework.
     * @constructor
     */
    constructor() {
        this.modules = {};
    }

    /**
     * Registers a new module into the OpenFramework.
     * @param {string} name - The name of the module.
     * @param {Object} module - The module object containing functionalities.
     * @throws {Error} Throws an error if the module is already registered.
     */
    registerModule(name, module) {
        if (this.modules[name]) {
            throw new Error(`Module ${name} is already registered.`);
        }
        this.modules[name] = module;
    }

    /**
     * Retrieves a registered module by its name.
     * @param {string} name - The name of the module to retrieve.
     * @returns {Object} The registered module object.
     * @throws {Error} Throws an error if the module is not found.
     */
    getModule(name) {
        const module = this.modules[name];
        if (!module) {
            throw new Error(`Module ${name} not found.`);
        }
        return module;
    }

    /**
     * Invokes a function from a registered module.
     * @param {string} moduleName - The name of the module.
     * @param {string} functionName - The function to invoke.
     * @param {...*} args - The arguments to pass to the function.
     * @returns {*} The result of the function invocation.
     * @throws {Error} Throws an error if the module or function is not found.
     */
    invoke(moduleName, functionName, ...args) {
        const module = this.getModule(moduleName);
        if (typeof module[functionName] !== 'function') {
            throw new Error(`Function ${functionName} not found in module ${moduleName}.`);
        }
        return module[functionName](...args);
    }

    /**
     * Lists all registered modules.
     * @returns {Array} An array of module names.
     */
    listModules() {
        return Object.keys(this.modules);
    }
}

// Exporting the OpenFramework class for external use
module.exports = OpenFramework;