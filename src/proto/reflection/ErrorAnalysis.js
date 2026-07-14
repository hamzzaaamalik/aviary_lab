/**
 * ErrorAnalysis class for evaluating mistakes and adjusting behavior.
 * Provides mechanisms to analyze errors and identify patterns for improvement.
 */
class ErrorAnalysis {
    constructor() {
        this.errorLog = [];
    }

    /**
     * Records an error with its context.
     * @param {string} errorMessage - The error message to record.
     * @param {object} context - The context in which the error occurred.
     */
    recordError(errorMessage, context) {
        const errorEntry = {
            message: errorMessage,
            context: context,
            timestamp: new Date().toISOString()
        };
        this.errorLog.push(errorEntry);
    }

    /**
     * Analyzes recorded errors and identifies common patterns.
     * @returns {object} - Summary of error patterns, keys are error types.
     */
    analyzeErrors() {
        const summary = {};

        this.errorLog.forEach(entry => {
            const type = this.extractErrorType(entry.message);
            if (!summary[type]) {
                summary[type] = { count: 0, contexts: [] };
            }
            summary[type].count += 1;
            summary[type].contexts.push(entry.context);
        });

        return summary;
    }

    /**
     * Extracts a type from the error message for categorization.
     * @param {string} message - The error message.
     * @returns {string} - The extracted error type.
     */
    extractErrorType(message) {
        // Simplistic type extraction: could be improved with regex or more sophisticated methods
        return message.split(':')[0];
    }

    /**
     * Clears the error log.
     */
    clearErrors() {
        this.errorLog = [];
    }
}

module.exports = ErrorAnalysis;