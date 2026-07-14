/**
 * OpenFramework - A foundation for building interoperable components.
 * 
 * This module provides interfaces and utilities for creating plugins and SDKs that can
 * be integrated with the core system.
 * 
 * @module OpenFramework
 */

class OpenFramework {
    constructor() {
        this.plugins = new Map();
    }

    /**
     * Registers a new plugin in the OpenFramework.
     * 
     * @param {string} name - The name of the plugin.
     * @param {Object} plugin - The plugin instance to register.
     * @throws {Error} Will throw an error if the plugin name is already registered.
     */
    registerPlugin(name, plugin) {
        if (this.plugins.has(name)) {
            throw new Error(`Plugin ${name} is already registered.`);
        }
        this.plugins.set(name, plugin);
    }

    /**
     * Unregisters an existing plugin.
     * 
     * @param {string} name - The name of the plugin to unregister.
     * @throws {Error} Will throw an error if the plugin is not found.
     */
    unregisterPlugin(name) {
        if (!this.plugins.has(name)) {
            throw new Error(`Plugin ${name} not found.`);
        }
        this.plugins.delete(name);
    }

    /**
     * Gets a plugin by its name.
     * 
     * @param {string} name - The name of the plugin to retrieve.
     * @returns {Object|null} The plugin instance or null if not found.
     */
    getPlugin(name) {
        return this.plugins.get(name) || null;
    }

    /**
     * Executes a method on all registered plugins.
     * 
     * @param {string} methodName - The name of the method to call on each plugin.
     * @param {...any} args - The arguments to pass to the plugin method.
     * @returns {Array} An array of results from each plugin.
     */
    executeOnPlugins(methodName, ...args) {
        const results = [];
        this.plugins.forEach((plugin, name) => {
            if (typeof plugin[methodName] === 'function') {
                results.push(plugin[methodName](...args));
            }
        });
        return results;
    }
}

module.exports = new OpenFramework();