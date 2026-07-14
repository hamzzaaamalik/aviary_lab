/**
 * EventManager class handles the lifecycle of events in the system, allowing
 * modules to subscribe and react to events in a decoupled manner.
 */
class EventManager {
    constructor() {
        this.listeners = {};
    }

    /**
     * Subscribe to an event with a callback.
     * @param {string} event - The name of the event to subscribe to.
     * @param {Function} callback - The function to call when the event occurs.
     */
    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * Unsubscribe from an event.
     * @param {string} event - The name of the event.
     * @param {Function} callback - The callback to remove.
     */
    unsubscribe(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    /**
     * Emit an event, calling all subscribed callbacks.
     * @param {string} event - The name of the event to emit.
     * @param {...any} args - Arguments to pass to the callbacks.
     */
    emit(event, ...args) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback(...args));
    }
}

// Export the EventManager so it can be used in other modules.
module.exports = EventManager;
