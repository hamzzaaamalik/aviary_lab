/**
 * ErrorAnalysis class for analyzing mistakes and adjusting behavior.
 * This class implements hooks to register errors and learn from them.
 */
class ErrorAnalysis {
    constructor() {
        this.errors = [];
        this.errorHooks = [];
    }

    /**
     * Register an error.
     * @param {string} errorMessage - Description of the error.
     * @param {Object} context - Contextual information related to the error.
     */
    registerError(errorMessage, context) {
        const errorEntry = {
            message: errorMessage,
            context: context,
            timestamp: new Date().toISOString()
        };
        this.errors.push(errorEntry);
        this.triggerHooks(errorEntry);
    }

    /**
     * Add a hook to be called when an error is registered.
     * @param {Function} hook - Function that takes an error entry as argument.
     */
    addErrorHook(hook) {
        if (typeof hook === 'function') {
            this.errorHooks.push(hook);
        }
    }

    /**
     * Trigger all registered hooks with the provided error entry.
     * @param {Object} errorEntry - The error entry to pass to hooks.
     */
    triggerHooks(errorEntry) {
        this.errorHooks.forEach(hook => hook(errorEntry));
    }

    /**
     * Retrieve all registered errors.
     * @returns {Array} - Array of error entries.
     */
    getErrors() {
        return this.errors;
    }
}

module.exports = ErrorAnalysis;