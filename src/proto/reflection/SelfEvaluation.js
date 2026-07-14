/**
 * SelfEvaluation class for assessing actions against goals and outcomes.
 * Provides methods to evaluate success and adjust future behavior based on past performance.
 */
class SelfEvaluation {
    constructor() {
        this.histories = {};
    }

    /**
     * Record the outcome of an action against a goal.
     * @param {string} action - The action taken.
     * @param {boolean} wasSuccessful - Indicates if the action achieved the intended goal.
     */
    logOutcome(action, wasSuccessful) {
        if (!this.histories[action]) {
            this.histories[action] = { successes: 0, failures: 0 };
        }
        if (wasSuccessful) {
            this.histories[action].successes += 1;
        } else {
            this.histories[action].failures += 1;
        }
    }

    /**
     * Evaluate the performance of an action based on logged outcomes.
     * @param {string} action - The action to evaluate.
     * @returns {number} - Success rate as a percentage.
     */
    evaluateAction(action) {
        if (!this.histories[action]) {
            return null;  // No history available for this action.
        }
        const { successes, failures } = this.histories[action];
        const totalAttempts = successes + failures;
        return totalAttempts > 0 ? (successes / totalAttempts) * 100 : 0;
    }

    /**
     * Suggests adjustments for future behavior based on past performance.
     * @param {string} action - The action to analyze.
     * @returns {string} - Suggestion for improvement or affirmation.
     */
    suggestAdjustment(action) {
        const successRate = this.evaluateAction(action);
        if (successRate === null) {
            return 'No data available for this action.';
        }
        if (successRate < 50) {
            return 'Consider revising your approach for this action.';
        } else {
            return 'Good job! Keep up the successful actions.';
        }
    }
}

export default SelfEvaluation;