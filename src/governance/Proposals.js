/**
 * Proposals.js
 * 
 * This module manages the creation, validation, and tracking of proposals within the governance system.
 * Proposals are essential for enabling agents to suggest changes or actions that require collective decision-making.
 * 
 * @module governance/Proposals
 */

class Proposal {
    /**
     * Creates an instance of a Proposal.
     * @param {string} id - Unique identifier for the proposal.
     * @param {string} description - Description of the proposal.
     * @param {string} proposer - Identifier of the agent proposing the proposal.
     */
    constructor(id, description, proposer) {
        this.id = id;
        this.description = description;
        this.proposer = proposer;
        this.status = 'pending'; // pending, approved, rejected
        this.votes = { yes: 0, no: 0 };
    }

    /**
     * Cast a vote on the proposal.
     * @param {boolean} vote - True for 'yes', false for 'no'.
     */
    castVote(vote) {
        if (vote) {
            this.votes.yes++;
        } else {
            this.votes.no++;
        }
    }

    /**
     * Approves the proposal.
     */
    approve() {
        this.status = 'approved';
    }

    /**
     * Rejects the proposal.
     */
    reject() {
        this.status = 'rejected';
    }
}

class ProposalManager {
    constructor() {
        this.proposals = {};
    }

    /**
     * Creates a new proposal.
     * @param {string} id - Unique identifier for the proposal.
     * @param {string} description - Description of the proposal.
     * @param {string} proposer - Identifier of the proposing agent.
     * @returns {Proposal} The created proposal.
     */
    createProposal(id, description, proposer) {
        const proposal = new Proposal(id, description, proposer);
        this.proposals[id] = proposal;
        return proposal;
    }

    /**
     * Retrieves a proposal by its ID.
     * @param {string} id - Unique identifier for the proposal.
     * @returns {Proposal|null} The requested proposal or null if not found.
     */
    getProposal(id) {
        return this.proposals[id] || null;
    }

    /**
     * Gets all proposals.
     * @returns {Proposal[]} Array of all proposals.
     */
    getAllProposals() {
        return Object.values(this.proposals);
    }
}

export { Proposal, ProposalManager };