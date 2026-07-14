/**
 * MemoryAnalysis.js
 * 
 * This module provides functionality to analyze and summarize memory content,
 * enabling PROTO to reflect on past experiences and make informed decisions.
 * It leverages LongTermMemory to extract relevant memories.
 * 
 * @module MemoryAnalysis
 */

import LongTermMemory from './LongTermMemory';

/**
 * Class representing a memory analyzer.
 */
class MemoryAnalysis {
    /**
     * Create a MemoryAnalysis instance.
     * @param {LongTermMemory} memory - An instance of LongTermMemory to analyze.
     */
    constructor(memory) {
        this.memory = memory;
    }

    /**
     * Retrieve a summary of memories based on a specific criterion.
     * @param {string} criterion - The criterion to filter memories by.
     * @returns {Array} - An array of summarized memories matching the criterion.
     */
    summarizeMemories(criterion) {
        const relevantMemories = this.memory.getMemoriesByCriterion(criterion);
        return relevantMemories.map(memory => this._summarizeMemory(memory));
    }

    /**
     * Summarize a single memory.
     * @private
     * @param {Object} memory - The memory object to summarize.
     * @returns {Object} - A summarized version of the memory.
     */
    _summarizeMemory(memory) {
        return {
            id: memory.id,
            timestamp: memory.timestamp,
            content: memory.content.slice(0, 50) + (memory.content.length > 50 ? '...' : ''),
            relevanceScore: this._calculateRelevanceScore(memory)
        };
    }

    /**
     * Calculate a relevance score based on the memory's content.
     * @private
     * @param {Object} memory - The memory object to evaluate.
     * @returns {number} - A relevance score between 0 and 1.
     */
    _calculateRelevanceScore(memory) {
        // Simple placeholder logic for relevance scoring
        const keywords = ['important', 'urgent', 'notable'];
        return keywords.reduce((score, keyword) => {
            return score + (memory.content.includes(keyword) ? 0.3 : 0);
        }, 0);
    }
}

export default MemoryAnalysis;