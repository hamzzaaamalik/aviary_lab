/**
 * ConsensusProtocol.js
 * 
 * This module implements a consensus protocol for decision-making in the system. 
 * It utilizes a voting mechanism to ensure that agents can agree on important decisions,
 * making the governance process more efficient and democratic.
 * 
 * @module governance/ConsensusProtocol
 */

class ConsensusProtocol {
    constructor() {
        this.votes = new Map(); // Store votes for each proposal
    }

    /**
     * Initiate a new proposal for voting.
     * @param {string} proposalId - Unique identifier for the proposal.
     * @param {Array<string>} agents - List of agents participating in the vote.
     */
    initiateProposal(proposalId, agents) {
        if (this.votes.has(proposalId)) {
            throw new Error(`Proposal ${proposalId} already exists.`);
        }
        this.votes.set(proposalId, { agents: agents, votes: new Map(), isClosed: false });
    }

    /**
     * Cast a vote for a specific proposal.
     * @param {string} proposalId - ID of the proposal being voted on.
     * @param {string} agentId - ID of the agent casting the vote.
     * @param {boolean} vote - TRUE for supporting, FALSE for opposing the proposal.
     */
    castVote(proposalId, agentId, vote) {
        const proposal = this.votes.get(proposalId);
        if (!proposal || proposal.isClosed) {
            throw new Error(`Proposal ${proposalId} is not valid for voting.`);
        }
        proposal.votes.set(agentId, vote);
    }

    /**
     * Close voting for a proposal and determine the outcome.
     * @param {string} proposalId - ID of the proposal to close voting on.
     * @returns {boolean} - TRUE if proposal passed, FALSE otherwise.
     */
    closeVoting(proposalId) {
        const proposal = this.votes.get(proposalId);
        if (!proposal) {
            throw new Error(`Proposal ${proposalId} does not exist.`);
        }
        proposal.isClosed = true;
        const totalVotes = proposal.votes.size;
        const yesVotes = Array.from(proposal.votes.values()).filter(vote => vote).length;

        return yesVotes > totalVotes / 2; // Majority rule
    }

    /**
     * Get the current status of a proposal.
     * @param {string} proposalId - ID of the proposal to get status for.
     * @returns {Object} - Current status including votes and whether it is closed.
     */
    getProposalStatus(proposalId) {
        const proposal = this.votes.get(proposalId);
        if (!proposal) {
            throw new Error(`Proposal ${proposalId} does not exist.`);
        }
        return proposal;
    }
}

module.exports = ConsensusProtocol;
