/**
 * CultureTimelineEngine.js
 * 
 * This module is responsible for managing and querying the culture timeline.
 * It allows for the addition, retrieval, and organization of historical events
 * that shape the culture's lore. Events are stored with timestamps and can
 * be categorized for more accessible querying.
 * 
 * @module CultureTimelineEngine
 */

class CultureTimelineEngine {
    constructor() {
        this.timeline = [];
    }

    /**
     * Adds a new event to the timeline.
     * 
     * @param {string} event - The description of the event.
     * @param {Date} date - The date the event occurred.
     * @param {string} category - The category of the event (e.g., "myth", "history").
     * @throws {Error} Will throw an error if the event is empty or date is invalid.
     */
    addEvent(event, date, category) {
        if (!event || !(date instanceof Date) || !category) {
            throw new Error('Invalid event data.');
        }
        this.timeline.push({ event, date, category });
        this.timeline.sort((a, b) => a.date - b.date);
    }

    /**
     * Retrieves all events from the timeline, optionally filtered by category.
     * 
     * @param {string} [category] - Optional category to filter events.
     * @returns {Array} Array of events that match the criteria.
     */
    getEvents(category) {
        return category ? this.timeline.filter(evt => evt.category === category) : this.timeline;
    }

    /**
     * Retrieves events within a specific date range.
     * 
     * @param {Date} startDate - The start date for the range.
     * @param {Date} endDate - The end date for the range.
     * @returns {Array} Filtered array of events within the date range.
     */
    getEventsByDateRange(startDate, endDate) {
        if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
            throw new Error('Invalid date range.');
        }
        return this.timeline.filter(evt => evt.date >= startDate && evt.date <= endDate);
    }

    /**
     * Returns a formatted string representation of the timeline.
     * 
     * @returns {string} Formatted string of all events.
     */
    toString() {
        return this.timeline.map(evt => `${evt.date.toISOString()}: ${evt.event} (${evt.category})`).join('\n');
    }
}

export default CultureTimelineEngine;