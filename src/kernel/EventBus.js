/**
 * EventBus is responsible for pub/sub pattern to facilitate communication
 * between various modules in the graduation system.
 * @class EventBus
 */
class EventBus {
    constructor() {
        this.listeners = {};
    }

    /**
     * Subscribe to an event type with the provided callback.
     * @param {string} eventType - The type of event to subscribe to.
     * @param {Function} callback - The function to call when the event occurs.
     */
    subscribe(eventType, callback) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    /**
     * Unsubscribe from an event type with the provided callback.
     * @param {string} eventType - The type of event to unsubscribe from.
     * @param {Function} callback - The function to remove from the listeners.
     */
    unsubscribe(eventType, callback) {
        if (!this.listeners[eventType]) return;
        this.listeners[eventType] = this.listeners[eventType].filter(listener => listener !== callback);
    }

    /**
     * Publish an event of the specified type, invoking all subscribed callbacks.
     * @param {string} eventType - The type of event to publish.
     * @param {...*} args - The arguments to pass to the event callbacks.
     */
    publish(eventType, ...args) {
        if (!this.listeners[eventType]) return;
        this.listeners[eventType].forEach(callback => callback(...args));
    }
}

// Export the EventBus for external use
export default EventBus;