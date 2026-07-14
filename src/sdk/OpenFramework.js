/**
 * OpenFramework class to facilitate the creation and management of extensions.
 * This class provides a structured way for developers to register and interact with plugins,
 * ensuring compatibility and ease of integration.
 */
class OpenFramework {
    constructor() {
        this.plugins = new Map();
    }

    /**
     * Registers a new plugin with the given name and implementation.
     * @param {string} name - The unique name of the plugin.
     * @param {Object} implementation - The implementation object for the plugin.
     * @throws {Error} If the plugin name already exists.
     */
    registerPlugin(name, implementation) {
        if (this.plugins.has(name)) {
            throw new Error(`Plugin ${name} is already registered.`);
        }
        this.plugins.set(name, implementation);
        console.log(`Plugin ${name} registered successfully.`);
    }

    /**
     * Unregisters a plugin by its name.
     * @param {string} name - The name of the plugin to unregister.
     * @throws {Error} If the plugin does not exist.
     */
    unregisterPlugin(name) {
        if (!this.plugins.has(name)) {
            throw new Error(`Plugin ${name} does not exist.`);
        }
        this.plugins.delete(name);
        console.log(`Plugin ${name} unregistered successfully.`);
    }

    /**
     * Executes a method on all registered plugins.
     * @param {string} methodName - The method to call on each plugin.
     * @param {...any} args - The arguments to pass to the method.
     * @returns {Array} - Array of results from each plugin's method call.
     */
    executeMethodOnPlugins(methodName, ...args) {
        const results = [];
        this.plugins.forEach((plugin, name) => {
            if (typeof plugin[methodName] === 'function') {
                results.push(plugin[methodName](...args));
            } else {
                console.warn(`Plugin ${name} does not have method ${methodName}.`);
            }
        });
        return results;
    }

    /**
     * Retrieves a registered plugin by its name.
     * @param {string} name - The name of the plugin to retrieve.
     * @returns {Object|null} - The plugin implementation or null if not found.
     */
    getPlugin(name) {
        return this.plugins.get(name) || null;
    }
}

export default OpenFramework;