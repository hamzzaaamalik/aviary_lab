/**
 * CultureTimelineEngine.js
 * 
 * This module manages the timeline of cultural events, allowing for records, retrieval, and references.
 * 
 * @module src/lore/CultureTimelineEngine
 */

class CultureTimelineEngine {
    constructor() {
        this.timeline = [];
    }

    /**
     * Adds a cultural event to the timeline.
     * 
     * @param {string} event - The name of the event.
     * @param {Date} date - The date of the event.
     * @param {string} description - A brief description of the event.
     * @throws {Error} Will throw an error if the date is in the future.
     */
    addEvent(event, date, description) {
        const now = new Date();
        if (date > now) {
            throw new Error('Cannot add future events to the timeline.');
        }
        this.timeline.push({ event, date, description });
    }

    /**
     * Retrieves all events from the timeline.
     * 
     * @returns {Array} An array of events in the timeline.
     */
    getEvents() {
        return this.timeline;
    }

    /**
     * Retrieves events that occurred on a specific date.
     * 
     * @param {Date} date - The date to query.
     * @returns {Array} Array of events that occurred on the specified date.
     */
    getEventsByDate(date) {
        return this.timeline.filter(event => {
            return event.date.toDateString() === date.toDateString();
        });
    }

    /**
     * Returns a formatted string of the timeline.
     * 
     * @returns {string} A string representation of the timeline.
     */
    toString() {
        return this.timeline.map(event => {
            return `${event.date.toISOString().split('T')[0]}: ${event.event} - ${event.description}`;
        }).join('\n');
    }
}

module.exports = CultureTimelineEngine;