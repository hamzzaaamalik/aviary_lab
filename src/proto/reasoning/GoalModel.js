/**
 * GoalModel.js
 * 
 * Represents a model for defining and managing goals within the reasoning module.
 * This model helps in setting, updating, and evaluating goals that influence decision-making.
 * 
 * @class GoalModel
 */
class GoalModel {
    constructor() {
        /**
         * A list of goals.
         * @type {Array<{ id: string, description: string, priority: number, achieved: boolean }>} 
         */
        this.goals = [];
    }

    /**
     * Adds a new goal to the model.
     * 
     * @param {string} id - The unique identifier for the goal.
     * @param {string} description - A description of the goal.
     * @param {number} priority - The priority level of the goal (higher is more important).
     */
    addGoal(id, description, priority) {
        if (this.goals.some(goal => goal.id === id)) {
            throw new Error('Goal with this ID already exists.');
        }
        this.goals.push({ id, description, priority, achieved: false });
    }

    /**
     * Marks a goal as achieved.
     * 
     * @param {string} id - The unique identifier for the goal to be marked as achieved.
     * @throws Will throw an error if the goal is not found.
     */
    achieveGoal(id) {
        const goal = this.goals.find(goal => goal.id === id);
        if (!goal) {
            throw new Error('Goal not found.');
        }
        goal.achieved = true;
    }

    /**
     * Retrieves all goals, optionally filtered by their achieved status.
     * 
     * @param {boolean} [achieved] - If provided, retrieves only goals that match the achieved status.
     * @returns {Array<{ id: string, description: string, priority: number, achieved: boolean }>}  
     */
    getGoals(achieved) {
        if (achieved !== undefined) {
            return this.goals.filter(goal => goal.achieved === achieved);
        }
        return this.goals;
    }

    /**
     * Retrieves the highest priority goal that is not yet achieved.
     * 
     * @returns {<{ id: string, description: string, priority: number, achieved: boolean }>|null}  
     */
    getHighestPriorityGoal() {
        const unachievedGoals = this.goals.filter(goal => !goal.achieved);
        if (unachievedGoals.length === 0) return null;
        return unachievedGoals.reduce((highest, goal) => goal.priority > highest.priority ? goal : highest);
    }
}

module.exports = GoalModel;