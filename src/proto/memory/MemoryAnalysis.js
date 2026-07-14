/**
 * MemoryAnalysis class to analyze and optimize memory retrieval.
 * This class provides methods to assess the efficiency of memory
 * retrieval processes and suggest optimizations based on usage.
 */
class MemoryAnalysis {
    /**
     * Constructor for MemoryAnalysis.
     * @param {MemoryManager} memoryManager - Instance of MemoryManager.
     */
    constructor(memoryManager) {
        this.memoryManager = memoryManager;
    }

    /**
     * Analyzes memory retrieval performance.
     * @returns {Object} - Analysis results including retrieval times and
     *                    usage statistics.
     */
    analyzeRetrievalPerformance() {
        const retrievalStats = this.memoryManager.getRetrievalStats();
        const analysis = {
            averageTime: this.calculateAverage(retrievalStats.times),
            totalRetrievals: retrievalStats.count,
            successfulRetrievals: retrievalStats.successes,
        };
        return analysis;
    }

    /**
     * Suggests optimizations based on analyzed performance.
     * @returns {Array} - List of optimization suggestions.
     */
    suggestOptimizations() {
        const analysis = this.analyzeRetrievalPerformance();
        const suggestions = [];

        if (analysis.averageTime > this.memoryManager.threshold) {
            suggestions.push('Consider optimizing the indexing method used for memory retrieval.');
        }
        if (analysis.successfulRetrievals / analysis.totalRetrievals < 0.9) {
            suggestions.push('Investigate potential issues with memory corruption or outdated entries.');
        }
        return suggestions;
    }

    /**
     * Calculates the average of an array of numbers.
     * @param {Array<number>} values - Array of numbers to calculate the average.
     * @returns {number} - The average value.
     */
    calculateAverage(values) {
        const total = values.reduce((acc, val) => acc + val, 0);
        return total / values.length;
    }
}

module.exports = MemoryAnalysis;