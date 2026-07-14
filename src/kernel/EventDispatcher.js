/**
 * EventDispatcher class to manage the dispatching of events throughout the system.
 * Centralizes event handling, ensuring decoupled communication between modules.
 */
class EventDispatcher {
    constructor() {
        this.listeners = {};
    }

    /**
     * Registers a listener for a specific event.
     * @param {string} event - The event name to listen for.
     * @param {Function} listener - The callback function to execute when the event occurs.
     */
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    /**
     * Unregisters a listener for a specific event.
     * @param {string} event - The event name to stop listening for.
     * @param {Function} listener - The callback function to remove.
     */
    off(event, listener) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    }

    /**
     * Dispatches an event, executing all registered listeners.
     * @param {string} event - The event name to dispatch.
     * @param {...*} args - The arguments to pass to the listeners.
     */
    dispatch(event, ...args) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(listener => listener(...args));
    }

    /**
     * Checks if there are any listeners for a specific event.
     * @param {string} event - The event name to check.
     * @returns {boolean} - True if there are listeners, otherwise false.
     */
    hasListeners(event) {
        return !!this.listeners[event] && this.listeners[event].length > 0;
    }
}

module.exports = EventDispatcher;