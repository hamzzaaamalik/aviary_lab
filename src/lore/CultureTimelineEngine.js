/**
 * CultureTimelineEngine.js
 * 
 * This module manages the culture timeline, allowing for the addition, retrieval, and contextualization 
 * of significant cultural events. It serves to build a cohesive narrative of the shared history, 
 * facilitating better understanding and reasoning.
 * 
 * @module CultureTimelineEngine
 */

class CultureTimelineEngine {
    constructor() {
        this.timeline = [];  // array to hold cultural events
    }

    /**
     * Adds an event to the timeline.
     * 
     * @param {string} title - The title of the event.
     * @param {Date} date - The date of the event.
     * @param {string} description - A brief description of the event.
     * @throws {Error} Will throw an error if event date is invalid.
     */
    addEvent(title, date, description) {
        if (!(date instanceof Date) || isNaN(date)) {
            throw new Error('Invalid date provided.');
        }
        this.timeline.push({ title, date, description });
    }

    /**
     * Retrieves events that occurred on a specific date.
     * 
     * @param {Date} date - The date for which to retrieve events.
     * @returns {Array} - An array of events occurring on the given date.
     */
    getEventsByDate(date) {
        return this.timeline.filter(event => {
            return event.date.toDateString() === date.toDateString();
        });
    }

    /**
     * Retrieves all events sorted by date.
     * 
     * @returns {Array} - A sorted array of all events.
     */
    getAllEvents() {
        return this.timeline.sort((a, b) => a.date - b.date);
    }

    /**
     * Gets a contextual overview of events surrounding a specific date.
     * 
     * @param {Date} date - The date around which to gather context.
     * @param {number} range - The range of days to gather context from.
     * @returns {Array} - An array of events within the specified range.
     */
    getContextualEvents(date, range = 5) {
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() - range);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + range);
        return this.timeline.filter(event => {
            return event.date >= startDate && event.date <= endDate;
        });
    }
}

module.exports = CultureTimelineEngine;
