/**
 * DecisionMaking module for self-organizing agents.
 * Handles proposal evaluations and consensus decisions.
 */
class DecisionMaking {
    constructor() {
        this.proposals = [];
        this.decisions = [];
    }

    /**
     * Adds a proposal to the list for evaluation.
     * @param {Object} proposal - The proposal object to be added.
     * @throws {Error} - If the proposal is invalid.
     */
    addProposal(proposal) {
        this.validateProposal(proposal);
        this.proposals.push(proposal);
    }

    /**
     * Validates the structure of a proposal.
     * @param {Object} proposal - The proposal to validate.
     * @throws {Error} - If the proposal does not meet the required structure.
     */
    validateProposal(proposal) {
        if (!proposal.id || !proposal.content || !Array.isArray(proposal.votes)) {
            throw new Error('Invalid proposal structure.');
        }
    }

    /**
     * Processes proposals and makes a decision based on votes.
     * @returns {Object} - The outcome of the decision-making process.
     */
    processDecisions() {
        if (this.proposals.length === 0) {
            throw new Error('No proposals to process.');
        }
        this.proposals.forEach(proposal => {
            const outcome = this.evaluateProposal(proposal);
            this.decisions.push(outcome);
        });
        this.proposals = []; // Clear proposals after processing.
        return this.decisions;
    }

    /**
     * Evaluates a single proposal based on votes.
     * @param {Object} proposal - The proposal to evaluate.
     * @returns {Object} - The result of the proposal evaluation.
     */
    evaluateProposal(proposal) {
        const totalVotes = proposal.votes.length;
        const approvalVotes = proposal.votes.filter(vote => vote === 'approve').length;
        const decision = approvalVotes / totalVotes > 0.5 ? 'approved' : 'rejected';
        return { proposalId: proposal.id, decision };
    }
}

module.exports = DecisionMaking;