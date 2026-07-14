/**
 * SelfEvaluation class for analyzing performance and providing feedback.
 * It identifies errors and strengths in decision-making processes based on outcomes.
 */
class SelfEvaluation {
    constructor() {
        this.evaluations = [];
    }

    /**
     * Evaluates a given outcome against expected criteria.
     * @param {string} outcome - The actual outcome of the action.
     * @param {string} expected - The expected outcome for comparison.
     * @returns {Object} - Evaluation result with feedback.
     */
    evaluate(outcome, expected) {
        const evaluation = {
            outcome: outcome,
            expected: expected,
            correct: outcome === expected
        };

        this.evaluations.push(evaluation);
        return this.feedback(evaluation);
    }

    /**
     * Generates feedback based on the evaluation.
     * @param {Object} evaluation - The evaluation object.
     * @returns {string} - Feedback string.
     */
    feedback(evaluation) {
        if (evaluation.correct) {
            return 'Outcome is as expected.';
        } else {
            return this.analyzeError(evaluation);
        }
    }

    /**
     * Analyzes errors and provides specific feedback on improvements.
     * @param {Object} evaluation - The evaluation object.
     * @returns {string} - Error analysis feedback.
     */
    analyzeError(evaluation) {
        const discrepancies = this.findDiscrepancies(evaluation);
        return `Outcome differs from expected. Consider these factors: ${discrepancies.join(', ')}.`;
    }

    /**
     * Identifies discrepancies between expected and actual outcomes.
     * @param {Object} evaluation - The evaluation object.
     * @returns {Array} - List of identified discrepancies.
     */
    findDiscrepancies(evaluation) {
        // Simple placeholder for demonstration.
        // In a real implementation, this would analyze patterns.
        // Currently returns a static suggestion.
        return ['contextual factors', 'decision criteria', 'external influences'];
    }

    /**
     * Returns all evaluations logged.
     * @returns {Array} - Array of evaluations.
     */
    getEvaluations() {
        return this.evaluations;
    }
}

module.exports = SelfEvaluation;