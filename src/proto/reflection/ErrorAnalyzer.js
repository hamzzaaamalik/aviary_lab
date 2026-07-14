/**
 * ErrorAnalyzer.js
 * 
 * This module analyzes errors that occur during processing and provides hooks for learning from these errors.
 * It aims to support self-awareness by allowing the system to reflect on its mistakes and adjust future behavior accordingly.
 * 
 * @module ErrorAnalyzer
 */

class ErrorAnalyzer {
    /**
     * Creates an instance of ErrorAnalyzer.
     * @param {Function} callback - A callback function to execute when an error is logged.
     */
    constructor(callback) {
        this.callback = callback;
        this.errorLog = [];
    }

    /**
     * Logs an error and triggers the callback for further processing.
     * 
     * @param {Error} error - The error object that needs to be logged.
     * @param {string} context - The context in which the error occurred.
     */
    logError(error, context) {
        const errorEntry = {
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString()
        };
        this.errorLog.push(errorEntry);
        this.callback(errorEntry);
    }

    /**
     * Returns the error log.
     * 
     * @returns {Array} - The array of logged errors.
     */
    getErrorLog() {
        return this.errorLog;
    }

    /**
     * Analyzes the errors to determine common patterns and suggests adjustments.
     * 
     * @returns {Object} - An object containing suggestions for adjustments based on logged errors.
     */
    analyzeErrors() {
        const suggestions = {};
        this.errorLog.forEach(error => {
            const context = error.context;
            if (!suggestions[context]) {
                suggestions[context] = { count: 0, examples: [] };
            }
            suggestions[context].count++;
            suggestions[context].examples.push(error);
        });
        return suggestions;
    }
}

module.exports = ErrorAnalyzer;
