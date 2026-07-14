/**
 * KnowledgeSchema.js
 * This module defines the schema for knowledge representation within the Library.
 * It structures how knowledge units are organized, stored, and accessed by other modules.
 */

class KnowledgeUnit {
    constructor(id, title, content, tags = []) {
        this.id = id;  // unique identifier for the knowledge unit
        this.title = title;  // title of the knowledge unit
        this.content = content;  // main content of the knowledge unit
        this.tags = tags;  // array of tags for categorization
    }
}

class KnowledgeSchema {
    constructor() {
        this.knowledgeUnits = new Map();  // store knowledge units by id
    }

    /**
     * Adds a knowledge unit to the schema.
     * @param {KnowledgeUnit} unit - The knowledge unit to add.
     * @throws Will throw an error if the unit already exists.
     */
    addKnowledgeUnit(unit) {
        if (this.knowledgeUnits.has(unit.id)) {
            throw new Error('Knowledge unit with this ID already exists.');
        }
        this.knowledgeUnits.set(unit.id, unit);
    }

    /**
     * Retrieves a knowledge unit by its ID.
     * @param {string} id - The ID of the knowledge unit to retrieve.
     * @returns {KnowledgeUnit|null} The knowledge unit or null if not found.
     */
    getKnowledgeUnit(id) {
        return this.knowledgeUnits.get(id) || null;
    }

    /**
     * Retrieves all knowledge units that match the given tags.
     * @param {Array<string>} tags - An array of tags to filter knowledge units.
     * @returns {Array<KnowledgeUnit>} An array of matching knowledge units.
     */
    getKnowledgeUnitsByTags(tags) {
        return Array.from(this.knowledgeUnits.values()).filter(unit =>
            unit.tags.some(tag => tags.includes(tag))
        );
    }

    /**
     * Lists all knowledge units in the schema.
     * @returns {Array<KnowledgeUnit>} All knowledge units as an array.
     */
    listAllKnowledgeUnits() {
        return Array.from(this.knowledgeUnits.values());
    }
}

module.exports = { KnowledgeSchema, KnowledgeUnit };