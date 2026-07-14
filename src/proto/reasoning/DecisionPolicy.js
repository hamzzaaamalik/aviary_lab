/**
 * DecisionPolicy class for implementing decision-making strategies.
 * Provides an interface for scoring and selecting decisions based on defined criteria.
 */
class DecisionPolicy {
    /**
     * Constructs a DecisionPolicy instance.
     * @param {Array} criteria - An array of criteria for decision scoring.
     */
    constructor(criteria) {
        this.criteria = criteria;
    }

    /**
     * Scores a decision based on the provided input values.
     * @param {Object} inputs - The inputs required for scoring.
     * @returns {number} - The score for the decision.
     */
    score(inputs) {
        let score = 0;
        this.criteria.forEach(criterion => {
            score += criterion.evaluate(inputs);
        });
        return score;
    }

    /**
     * Selects the best decision from an array of options based on scores.
     * @param {Array} decisions - An array of decision objects to evaluate.
     * @returns {Object|null} - The selected decision or null if none.
     */
    selectBest(decisions) {
        let bestDecision = null;
        let highestScore = -Infinity;

        decisions.forEach(decision => {
            const score = this.score(decision.inputs);
            if (score > highestScore) {
                highestScore = score;
                bestDecision = decision;
            }
        });

        return bestDecision;
    }
}

export default DecisionPolicy;
