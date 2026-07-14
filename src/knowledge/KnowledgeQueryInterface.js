/**
 * KnowledgeQueryInterface.js
 * 
 * This module defines the interface for querying knowledge in the library. 
 * It allows other components to retrieve information based on specific criteria, 
 * enhancing the overall accessibility of knowledge.
 * 
 * @module KnowledgeQueryInterface
 */

class KnowledgeQueryInterface {
    constructor(knowledgeBase) {
        /**
         * The knowledge base to query.
         * @type {Object}
         */
        this.knowledgeBase = knowledgeBase;
    }

    /**
     * Query the knowledge base for entries that match the provided criteria.
     * 
     * @param {string} criteria - The criteria to search for in the knowledge base.
     * @returns {Array} - An array of matching knowledge entries.
     */
    query(criteria) {
        const results = [];
        for (const entry of this.knowledgeBase) {
            if (this.matchesCriteria(entry, criteria)) {
                results.push(entry);
            }
        }
        return results;
    }

    /**
     * Check if a knowledge entry matches the given criteria.
     * This is a basic matching function that can be extended or modified.
     * 
     * @param {Object} entry - The knowledge entry to evaluate.
     * @param {string} criteria - The criteria to evaluate against.
     * @returns {boolean} - True if the entry matches, false otherwise.
     */
    matchesCriteria(entry, criteria) {
        // Basic matching logic (could be extended with complex rules)
        return entry.title.includes(criteria) || entry.content.includes(criteria);
    }

    /**
     * Add a new knowledge entry to the knowledge base.
     * 
     * @param {Object} entry - The knowledge entry to add, should have title and content.
     * @throws {Error} - Throws an error if entry is invalid.
     */
    addEntry(entry) {
        if (!entry.title || !entry.content) {
            throw new Error('Invalid entry. Must have title and content.');
        }
        this.knowledgeBase.push(entry);
    }
}

export default KnowledgeQueryInterface;