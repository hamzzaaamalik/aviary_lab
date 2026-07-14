/**
 * DecisionMaker class for evaluating options and selecting the best course of action.
 * This class implements a scoring system to evaluate decisions based on predefined criteria.
 */
class DecisionMaker {
    constructor() {
        this.options = [];
    }

    /**
     * Adds an option to the decision-making process.
     * @param {string} option - The option to be evaluated.
     * @param {Object} criteria - The criteria against which the option will be scored.
     */
    addOption(option, criteria) {
        const score = this.evaluateOption(criteria);
        this.options.push({ option, score });
    }

    /**
     * Evaluates an option based on its criteria.
     * This method should implement a custom scoring logic based on the criteria provided.
     * @param {Object} criteria - The criteria for evaluating the option.
     * @returns {number} - The score for the given option.
     */
    evaluateOption(criteria) {
        // Example scoring logic; this can be customized as needed.
        let score = 0;
        if (criteria.urgency) score += 10 - criteria.urgency;
        if (criteria.importance) score += criteria.importance;
        if (criteria.feasibility) score += criteria.feasibility * 0.5;
        return score;
    }

    /**
     * Determines the best option based on the accumulated scores.
     * @returns {string|null} - The best option or null if no options are available.
     */
    getBestOption() {
        if (this.options.length === 0) return null;
        return this.options.reduce((best, current) => {
            return (current.score > best.score) ? current : best;
        }).option;
    }

    /**
     * Clears all options from the DecisionMaker.
     */
    clearOptions() {
        this.options = [];
    }
}

module.exports = DecisionMaker;