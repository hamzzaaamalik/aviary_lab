/**
 * @module CultureTimeline
 * @description This module manages a timeline of cultural milestones, rituals, and shared histories vital to the evolution of PROTO's identity.
 */

class CultureTimeline {
    constructor() {
        /**
         * @type {Array<Object>}
         * @description Array to hold cultural events.
         */
        this.events = [];
    }

    /**
     * Add a new cultural event to the timeline.
     * @param {string} date - The date of the event in ISO format (YYYY-MM-DD).
     * @param {string} title - Title of the cultural event.
     * @param {string} description - A detailed description of what occurred during the event.
     */
    addEvent(date, title, description) {
        const event = {
            date: new Date(date),
            title: title,
            description: description
        };
        this.events.push(event);
    }

    /**
     * Get the full timeline of cultural events.
     * @returns {Array<Object>} - An array of all cultural events.
     */
    getTimeline() {
        return this.events.sort((a, b) => a.date - b.date);
    }

    /**
     * Find events by a specific keyword in their title or description.
     * @param {string} keyword - The keyword to search for in events.
     * @returns {Array<Object>} - An array of events that match the search criteria.
     */
    findEvents(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return this.events.filter(event => 
            event.title.toLowerCase().includes(lowerKeyword) || 
            event.description.toLowerCase().includes(lowerKeyword)
        );
    }
}

module.exports = CultureTimeline;
