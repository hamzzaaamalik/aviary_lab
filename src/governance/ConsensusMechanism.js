/**
 * ConsensusMechanism.js
 * 
 * This module implements a consensus mechanism to facilitate agreement among agents on proposals.
 * It allows agents to collaborate and reach a collective decision based on majority voting.
 * 
 * @module governance/ConsensusMechanism
 */

class ConsensusMechanism {
    constructor() {
        this.agents = new Set(); // Set of agents participating in consensus
        this.proposals = new Map(); // Map to store proposals with their votes
    }

    /**
     * Registers an agent to the consensus mechanism.
     * @param {string} agentId - The unique identifier of the agent.
     */
    registerAgent(agentId) {
        this.agents.add(agentId);
    }

    /**
     * Unregisters an agent from the consensus mechanism.
     * @param {string} agentId - The unique identifier of the agent.
     */
    unregisterAgent(agentId) {
        this.agents.delete(agentId);
    }

    /**
     * Creates a proposal and initializes its votes.
     * @param {string} proposalId - The unique identifier for the proposal.
     */
    createProposal(proposalId) {
        if (!this.proposals.has(proposalId)) {
            this.proposals.set(proposalId, { votes: new Map(), totalVotes: 0 });
        }
    }

    /**
     * Allows an agent to vote on a proposal.
     * @param {string} agentId - The unique identifier of the agent.
     * @param {string} proposalId - The identifier of the proposal.
     * @param {boolean} vote - The vote value (true for support, false for opposition).
     */
    vote(agentId, proposalId, vote) {
        if (!this.proposals.has(proposalId)) {
            throw new Error('Proposal not found.');
        }

        const proposal = this.proposals.get(proposalId);
        if (!proposal.votes.has(agentId)) {
            proposal.votes.set(agentId, vote);
            proposal.totalVotes += vote ? 1 : -1;
        }
    }

    /**
     * Checks the outcome of a proposal based on the votes.
     * @param {string} proposalId - The identifier of the proposal.
     * @returns {string} - The result of the vote ('approved', 'rejected', or 'inconclusive').
     */
    checkProposalOutcome(proposalId) {
        if (!this.proposals.has(proposalId)) {
            throw new Error('Proposal not found.');
        }

        const proposal = this.proposals.get(proposalId);
        const requiredVotes = Math.ceil(this.agents.size / 2);

        if (proposal.totalVotes >= requiredVotes) {
            return 'approved';
        } else if (proposal.totalVotes < 0) {
            return 'rejected';
        } else {
            return 'inconclusive';
        }
    }
}

export default ConsensusMechanism;