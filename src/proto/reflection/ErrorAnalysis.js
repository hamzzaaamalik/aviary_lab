/**
 * ErrorAnalysis class handles the analysis of errors encountered during operations.
 * It identifies patterns, categorizes errors, and provides insights for improvement.
 */
class ErrorAnalysis {
    constructor() {
        this.errorLog = [];
        this.errorPatterns = new Map();
    }

    /**
     * Logs an error and analyzes it for patterns.
     * 
     * @param {string} errorMessage - The error message to log.
     * @param {Object} context - The context in which the error occurred.
     */
    logError(errorMessage, context) {
        const errorEntry = { message: errorMessage, context, timestamp: new Date() };
        this.errorLog.push(errorEntry);
        this.analyzeErrorPattern(errorMessage);
    }

    /**
     * Analyzes the error message to identify and categorize error patterns.
     * 
     * @param {string} errorMessage - The error message to analyze.
     */
    analyzeErrorPattern(errorMessage) {
        const category = this.categorizeError(errorMessage);
        if (!this.errorPatterns.has(category)) {
            this.errorPatterns.set(category, 0);
        }
        this.errorPatterns.set(category, this.errorPatterns.get(category) + 1);
    }

    /**
     * Categorizes the error based on predefined criteria.
     * 
     * @param {string} errorMessage - The error message to categorize.
     * @returns {string} - The category of the error.
     */
    categorizeError(errorMessage) {
        if (errorMessage.includes('Network')) {
            return 'Network Error';
        } else if (errorMessage.includes('Validation')) {
            return 'Validation Error';
        } else {
            return 'General Error';
        }
    }

    /**
     * Returns the error log.
     * 
     * @returns {Array} - The list of logged errors.
     */
    getErrorLog() {
        return this.errorLog;
    }

    /**
     * Returns a summary of error patterns.
     * 
     * @returns {Object} - A summary of error categories and counts.
     */
    getErrorPatternsSummary() {
        const summary = {};
        this.errorPatterns.forEach((count, category) => {
            summary[category] = count;
        });
        return summary;
    }
}

module.exports = ErrorAnalysis;