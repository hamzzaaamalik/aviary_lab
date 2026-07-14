/**
 * SharedDecisionProtocol.js
 * 
 * This module implements a shared decision-making protocol for agents in the system, allowing them to discuss, propose, and reach consensus on decisions.
 * 
 * @module SharedDecisionProtocol
 */

class SharedDecisionProtocol {
    constructor() {
        this.proposals = [];
        this.votes = new Map();
        this.decisions = new Map();
    }

    /**
     * Submits a new proposal to the protocol.
     * @param {string} proposalId - Unique identifier for the proposal.
     * @param {string} description - Description of the proposal.
     * @returns {void}
     */
    submitProposal(proposalId, description) {
        if (this.proposals.find(p => p.id === proposalId)) {
            throw new Error('Proposal with this ID already exists.');
        }
        this.proposals.push({ id: proposalId, description });
        this.votes.set(proposalId, { yes: 0, no: 0 });
    }

    /**
     * Casts a vote on a specific proposal.
     * @param {string} proposalId - The ID of the proposal to vote on.
     * @param {boolean} vote - True for 'yes', false for 'no'.
     * @returns {void}
     */
    castVote(proposalId, vote) {
        if (!this.votes.has(proposalId)) {
            throw new Error('Proposal not found.');
        }
        const currentVotes = this.votes.get(proposalId);
        if (vote) {
            currentVotes.yes += 1;
        } else {
            currentVotes.no += 1;
        }
        this.votes.set(proposalId, currentVotes);
    }

    /**
     * Evaluates the proposal based on the votes and finalizes the decision.
     * @param {string} proposalId - The ID of the proposal to evaluate.
     * @returns {string} - Decision result: 'accepted', 'rejected', or 'inconclusive'.
     */
    evaluateProposal(proposalId) {
        if (!this.votes.has(proposalId)) {
            throw new Error('Proposal not found.');
        }
        const { yes, no } = this.votes.get(proposalId);
        const totalVotes = yes + no;
        if (totalVotes === 0) {
            return 'inconclusive';
        }
        const acceptanceRatio = yes / totalVotes;
        if (acceptanceRatio > 0.5) {
            this.decisions.set(proposalId, 'accepted');
            return 'accepted';
        } else {
            this.decisions.set(proposalId, 'rejected');
            return 'rejected';
        }
    }

    /**
     * Retrieves the current state of proposals and their votes.
     * @returns {Array} - List of proposals with their current voting state.
     */
    getProposalStatus() {
        return this.proposals.map(proposal => ({
            id: proposal.id,
            description: proposal.description,
            votes: this.votes.get(proposal.id)
        }));
    }
}

module.exports = SharedDecisionProtocol;