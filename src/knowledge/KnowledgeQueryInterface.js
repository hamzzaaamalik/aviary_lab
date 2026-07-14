/**
 * KnowledgeQueryInterface serves as the interface for querying the shared knowledge base.
 * It provides methods to retrieve knowledge entries based on various criteria.
 */
class KnowledgeQueryInterface {
    constructor(knowledgeBase) {
        /**
         * @type {Map<string, any>}
         * @private
         */
        this.knowledgeBase = knowledgeBase;
    }

    /**
     * Query knowledge entries by a specific key.
     * @param {string} key - The key to search in the knowledge base.
     * @returns {any|null} - Returns the knowledge entry if found, otherwise null.
     */
    getByKey(key) {
        if (this.knowledgeBase.has(key)) {
            return this.knowledgeBase.get(key);
        }
        return null;
    }

    /**
     * Query knowledge entries by a category.
     * @param {string} category - The category to filter knowledge entries.
     * @returns {Array<any>} - Returns an array of knowledge entries belonging to the specified category.
     */
    getByCategory(category) {
        const results = [];
        for (const [key, entry] of this.knowledgeBase.entries()) {
            if (entry.category === category) {
                results.push(entry);
            }
        }
        return results;
    }

    /**
     * Search knowledge entries by a keyword in their content.
     * @param {string} keyword - The keyword to search within knowledge entries.
     * @returns {Array<any>} - Returns an array of matching knowledge entries.
     */
    searchByKeyword(keyword) {
        const results = [];
        for (const [key, entry] of this.knowledgeBase.entries()) {
            if (entry.content.includes(keyword)) {
                results.push(entry);
            }
        }
        return results;
    }
}

export default KnowledgeQueryInterface;