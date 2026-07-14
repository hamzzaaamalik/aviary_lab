/**
 * Voting module for agent governance.
 * Handles proposals and manages the voting process among agents.
 * @module Voting
 */

class Voting {
    constructor() {
        this.votes = new Map();
        this.threshold = 0.5; // default threshold for consensus
    }

    /**
     * Set the consensus threshold.
     * @param {number} threshold - A number between 0 and 1 representing the consensus percentage.
     */
    setThreshold(threshold) {
        if (threshold < 0 || threshold > 1) {
            throw new Error('Threshold must be between 0 and 1.');
        }
        this.threshold = threshold;
    }

    /**
     * Cast a vote for a given proposal.
     * @param {string} agentId - The ID of the agent voting.
     * @param {string} proposalId - The ID of the proposal being voted on.
     * @param {boolean} support - Whether the vote supports the proposal.
     */
    castVote(agentId, proposalId, support) {
        if (!this.votes.has(proposalId)) {
            this.votes.set(proposalId, { support: 0, oppose: 0 });
        }
        const proposalVotes = this.votes.get(proposalId);
        if (support) {
            proposalVotes.support += 1;
        } else {
            proposalVotes.oppose += 1;
        }
    }

    /**
     * Determine if a proposal has reached consensus.
     * @param {string} proposalId - The ID of the proposal to check.
     * @returns {boolean} - True if consensus is reached, false otherwise.
     */
    checkConsensus(proposalId) {
        if (!this.votes.has(proposalId)) {
            return false;
        }
        const { support, oppose } = this.votes.get(proposalId);
        const totalVotes = support + oppose;
        if (totalVotes === 0) {
            return false; // no votes yet
        }
        return (support / totalVotes) >= this.threshold;
    }

    /**
     * Get the current vote tally for a proposal.
     * @param {string} proposalId - The ID of the proposal to retrieve votes for.
     * @returns {Object} - An object containing support and oppose counts.
     */
    getTally(proposalId) {
        return this.votes.get(proposalId) || { support: 0, oppose: 0 };
    }
}

module.exports = Voting;