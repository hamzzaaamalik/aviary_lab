/**
 * DecisionPolicy - Responsible for evaluating and scoring potential decisions.
 *
 * This class implements a mechanism to score decisions based on predefined criteria.
 */
class DecisionPolicy {
    constructor(criteria) {
        this.criteria = criteria;
    }

    /**
     * Evaluate a set of decisions and score them based on the criteria.
     *
     * @param {Array<Object>} decisions - The list of decisions to evaluate.
     * @returns {Array<Object>} - The decisions with their corresponding scores.
     */
    evaluate(decisions) {
        return decisions.map(decision => {
            const score = this.scoreDecision(decision);
            return { decision, score };
        });
    }

    /**
     * Score a single decision based on the defined criteria.
     *
     * @param {Object} decision - The decision to score.
     * @returns {number} - The score of the decision.
     */
    scoreDecision(decision) {
        let score = 0;
        for (const criterion of this.criteria) {
            score += this.evaluateCriterion(decision, criterion);
        }
        return score;
    }

    /**
     * Evaluate a single criterion against a decision.
     *
     * @param {Object} decision - The decision being evaluated.
     * @param {Function} criterion - The criterion function used for scoring.
     * @returns {number} - The score contribution from the criterion.
     */
    evaluateCriterion(decision, criterion) {
        return criterion(decision);
    }
}

export default DecisionPolicy;
