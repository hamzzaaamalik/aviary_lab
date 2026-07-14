/**
 * Voting.js
 * 
 * This module handles the voting mechanism for agents to make collective decisions.
 * It enables agents to propose options, vote on them, and tally the results.
 * 
 * @module Voting
 */

class Voting {
    constructor() {
        this.votes = {};
        this.proposals = {};
    }

    /**
     * Create a new proposal for voting.
     * 
     * @param {string} proposalId - Unique identifier for the proposal.
     * @param {string} description - Description of the proposal.
     * @returns {boolean} - Returns true if proposal is created successfully.
     */
    createProposal(proposalId, description) {
        if (this.proposals[proposalId]) {
            throw new Error('Proposal already exists.');
        }
        this.proposals[proposalId] = { description, votes: [] };
        return true;
    }

    /**
     * Cast a vote on a proposal.
     * 
     * @param {string} proposalId - Unique identifier for the proposal.
     * @param {string} agentId - Unique identifier for the agent casting the vote.
     * @param {boolean} vote - The vote (true for yes, false for no).
     * @returns {boolean} - Returns true if the vote is cast successfully.
     */
    castVote(proposalId, agentId, vote) {
        if (!this.proposals[proposalId]) {
            throw new Error('Proposal does not exist.');
        }
        if (this.votes[agentId]) {
            throw new Error('Agent has already voted.');
        }
        this.proposals[proposalId].votes.push({ agentId, vote });
        this.votes[agentId] = { proposalId, vote };
        return true;
    }

    /**
     * Tally the votes for a proposal.
     * 
     * @param {string} proposalId - Unique identifier for the proposal.
     * @returns {object} - Contains the count of yes and no votes.
     */
    tallyVotes(proposalId) {
        if (!this.proposals[proposalId]) {
            throw new Error('Proposal does not exist.');
        }
        const results = { yes: 0, no: 0 };
        this.proposals[proposalId].votes.forEach(vote => {
            if (vote.vote) {
                results.yes++;
            } else {
                results.no++;
            }
        });
        return results;
    }

    /**
     * Get all proposals.
     * 
     * @returns {object} - Returns all current proposals and their details.
     */
    getProposals() {
        return this.proposals;
    }
}

module.exports = Voting;