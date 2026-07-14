/**
 * ScoringDecisionPolicy.js
 * 
 * Implements a decision policy that scores options based on defined criteria.
 * This scoring mechanism helps to prioritize decisions in complex scenarios.
 * 
 * @module ScoringDecisionPolicy
 */

class ScoringDecisionPolicy {
    /**
     * Creates an instance of ScoringDecisionPolicy.
     * 
     * @param {Object} criteria - Criteria for scoring decisions.
     */
    constructor(criteria) {
        this.criteria = criteria;
    }

    /**
     * Scores a set of options based on the defined criteria.
     * 
     * @param {Array} options - The options to score.
     * @returns {Array} - Options sorted by score in descending order.
     */
    scoreOptions(options) {
        return options.map(option => {
            return {
                option,
                score: this.evaluateScore(option)
            };
        }).sort((a, b) => b.score - a.score);
    }

    /**
     * Evaluates the score of a single option based on criteria.
     * 
     * @param {Object} option - The option to evaluate.
     * @returns {number} - The computed score.
     */
    evaluateScore(option) {
        let score = 0;
        for (const [key, weight] of Object.entries(this.criteria)) {
            if (option[key] !== undefined) {
                score += option[key] * weight;
            }
        }
        return score;
    }
}

module.exports = ScoringDecisionPolicy;