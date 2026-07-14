/**
 * Planner class to manage goal planning and action sequencing.
 * This module provides functionality to create, update, and execute plans based on defined goals.
 *
 * @module Planner
 */

class Planner {
    constructor() {
        this.plans = new Map(); // stores plans associated with goals
    }

    /**
     * Creates a new plan for a specific goal.
     * @param {string} goal - The goal to achieve.
     * @param {Array} actions - An array of actions to execute for this goal.
     * @returns {boolean} - Returns true if the plan was created successfully.
     */
    createPlan(goal, actions) {
        if (this.plans.has(goal)) {
            console.warn(`Plan for goal '${goal}' already exists.`);
            return false;
        }
        this.plans.set(goal, actions);
        return true;
    }

    /**
     * Executes the plan associated with the specified goal.
     * @param {string} goal - The goal whose plan should be executed.
     * @returns {boolean} - Returns true if the plan was executed, false if no plan exists.
     */
    executePlan(goal) {
        if (!this.plans.has(goal)) {
            console.error(`No plan exists for goal '${goal}'.`);
            return false;
        }
        const actions = this.plans.get(goal);
        actions.forEach(action => action()); // execute each action in the plan
        return true;
    }

    /**
     * Updates existing plan with new actions for a specific goal.
     * @param {string} goal - The goal to update.
     * @param {Array} actions - New actions to execute for this goal.
     * @returns {boolean} - Returns true if the plan was updated successfully.
     */
    updatePlan(goal, actions) {
        if (!this.plans.has(goal)) {
            console.error(`Cannot update plan; no plan exists for goal '${goal}'.`);
            return false;
        }
        this.plans.set(goal, actions);
        return true;
    }

    /**
     * Lists all current plans and their associated goals.
     * @returns {Array} - Array of objects containing goal and associated actions.
     */
    listPlans() {
        return Array.from(this.plans.entries()).map(([goal, actions]) => ({ goal, actions }));
    }
}

export default Planner;