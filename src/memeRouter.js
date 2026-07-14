/**
 * @module memeRouter
 * @description A router for handling meme requests and managing meme workflows.
 */

class MemeRouter {
    constructor() {
        this.routes = {};
    }

    /**
     * Registers a new route.
     * @param {string} path - The path of the route.
     * @param {function} handler - The handler function for the route.
     */
    registerRoute(path, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Handler must be a function.');
        }
        this.routes[path] = handler;
    }

    /**
     * Handles an incoming request.
     * @param {string} path - The path of the incoming request.
     * @param {Object} [data] - Optional data for the handler.
     * @returns {Promise<any>} The result of the handler function.
     */
    async handleRequest(path, data) {
        const handler = this.routes[path];
        if (!handler) {
            throw new Error(`No handler found for path: ${path}`);
        }
        return await handler(data);
    }
}

export default MemeRouter;
