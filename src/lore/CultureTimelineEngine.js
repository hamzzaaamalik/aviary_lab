/**
 * @module CultureTimelineEngine
 * @description A module to manage the culture timeline, recording significant events and milestones in the development of shared cultural history.
 */

class CultureTimelineEngine {
    constructor() {
        this.timelineEvents = [];
    }

    /**
     * Adds a new event to the timeline.
     * @param {string} event - The description of the event.
     * @param {Date} date - The date of the event.
     * @param {string} [category='General'] - The category of the event (e.g., Ritual, Myth, Historical).
     * @throws {Error} If the event description is empty or the date is invalid.
     */
    addEvent(event, date, category = 'General') {
        if (!event || typeof event !== 'string') {
            throw new Error('Event description must be a non-empty string.');
        }
        if (!(date instanceof Date) || isNaN(date)) {
            throw new Error('Invalid date provided.');
        }
        this.timelineEvents.push({ event, date, category });
    }

    /**
     * Gets the entire timeline sorted by date.
     * @returns {Array} Sorted array of timeline events.
     */
    getTimeline() {
        return this.timelineEvents.sort((a, b) => a.date - b.date);
    }

    /**
     * Fetches events of a specific category.
     * @param {string} category - The category of events to fetch.
     * @returns {Array} Filtered array of events that match the category.
     */
    getEventsByCategory(category) {
        return this.timelineEvents.filter(event => event.category === category);
    }

    /**
     * Displays the timeline in a human-readable format.
     * @returns {string} Formatted timeline of events.
     */
    displayTimeline() {
        return this.timelineEvents.map(event => `${event.date.toISOString().split('T')[0]}: ${event.event} [${event.category}]`).join('\n');
    }
}

// Example usage
const cultureTimeline = new CultureTimelineEngine();

// Exporting the module to be used in other parts of the application.
module.exports = CultureTimelineEngine;