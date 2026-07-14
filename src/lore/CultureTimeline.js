/**
 * CultureTimeline.js
 *
 * This module manages the cultural timeline of the system, recording significant events
 * and milestones that shape the shared history. Each event is timestamped and associated
 * with specific cultural artifacts.
 */

class CultureTimeline {
    constructor() {
        this.events = [];
    }

    /**
     * Adds a new event to the timeline.
     *
     * @param {string} description - A description of the event.
     * @param {Date} date - The date of the event.
     * @param {Array<string>} artifacts - Associated cultural artifacts.
     * @throws {Error} Throws an error if the date is in the future.
     */
    addEvent(description, date, artifacts) {
        const now = new Date();
        if (date > now) {
            throw new Error('Event date cannot be in the future.');
        }
        this.events.push({ description, date, artifacts });
    }

    /**
     * Retrieves all events in the timeline.
     *
     * @returns {Array<Object>} An array of events with their descriptions, dates, and artifacts.
     */
    getEvents() {
        return this.events;
    }

    /**
     * Finds events by a specific artifact.
     *
     * @param {string} artifact - The name of the artifact to search for.
     * @returns {Array<Object>} An array of events associated with the specified artifact.
     */
    findEventsByArtifact(artifact) {
        return this.events.filter(event => event.artifacts.includes(artifact));
    }

    /**
     * Retrieves a chronological list of events.
     *
     * @returns {Array<Object>} A sorted array of events by date.
     */
    getChronologicalEvents() {
        return this.events.sort((a, b) => a.date - b.date);
    }
}

// Exporting the CultureTimeline class for external use.
module.exports = CultureTimeline;