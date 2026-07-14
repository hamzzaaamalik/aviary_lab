/**
 * KnowledgeSchema class to manage the structure of shared knowledge within the minds.
 * It defines how knowledge is categorized and how connections between knowledge pieces are represented.
 */
class KnowledgeSchema {
    constructor() {
        this.knowledgeBase = {};
    }

    /**
     * Adds a new concept to the knowledge base.
     * @param {string} concept - The name of the concept to add.
     * @param {Object} data - The data associated with the concept (e.g., definitions, examples).
     * @throws {Error} If the concept already exists.
     */
    addConcept(concept, data) {
        if (this.knowledgeBase[concept]) {
            throw new Error(`Concept '${concept}' already exists in the knowledge base.`);
        }
        this.knowledgeBase[concept] = data;
    }

    /**
     * Retrieves the data for a specific concept.
     * @param {string} concept - The name of the concept to retrieve.
     * @returns {Object|null} The data associated with the concept, or null if not found.
     */
    getConcept(concept) {
        return this.knowledgeBase[concept] || null;
    }

    /**
     * Lists all concepts in the knowledge base.
     * @returns {Array<string>} An array of all concept names.
     */
    listConcepts() {
        return Object.keys(this.knowledgeBase);
    }

    /**
     * Establishes a relationship between two concepts.
     * @param {string} conceptA - The first concept.
     * @param {string} conceptB - The second concept.
     * @param {string} relation - The type of relationship (e.g., 'is-a', 'related-to').
     * @throws {Error} If either concept does not exist.
     */
    relateConcepts(conceptA, conceptB, relation) {
        if (!this.knowledgeBase[conceptA] || !this.knowledgeBase[conceptB]) {
            throw new Error(`One or both concepts '${conceptA}', '${conceptB}' do not exist.`);
        }
        this.knowledgeBase[conceptA].relations = this.knowledgeBase[conceptA].relations || {};
        this.knowledgeBase[conceptA].relations[conceptB] = relation;
    }

    /**
     * Retrieves relationships for a specific concept.
     * @param {string} concept - The name of the concept to retrieve relationships for.
     * @returns {Object|null} An object mapping related concepts and their relationships, or null if not found.
     */
    getRelationships(concept) {
        return this.knowledgeBase[concept] ? this.knowledgeBase[concept].relations : null;
    }
}

export default KnowledgeSchema;