/**
 * GoalModel class represents a simple goal with a description and a status.
 * It provides methods to set, get, and evaluate the goal status.
 */
export class GoalModel {
    /**
     * @param {string} description - The description of the goal.
     * @throws {Error} - Throws an error if the description is empty.
     */
    constructor(description) {
        if (!description || description.trim() === '') {
            throw new Error('Description cannot be empty.');
        }
        this.description = description;
        this.completed = false;
    }

    /**
     * Marks the goal as completed.
     */
    complete() {
        this.completed = true;
    }

    /**
     * Checks if the goal is completed.
     * @returns {boolean} - Returns true if completed, false otherwise.
     */
    isCompleted() {
        return this.completed;
    }

    /**
     * Retrieves the goal description.
     * @returns {string} - The goal description.
     */
    getDescription() {
        return this.description;
    }
} 
