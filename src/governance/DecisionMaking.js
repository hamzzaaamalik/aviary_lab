/**
 * DecisionMaking.js
 * 
 * This module manages the shared decision-making protocol for agents.
 * It aims to facilitate collaborative decision-making through consensus
 * and majority rules, ensuring that all agents have a voice in the process.
 * 
 * @module Governance/DecisionMaking
 */

class DecisionMaking {
    /**
     * Creates an instance of DecisionMaking.
     * @param {Array} agents - An array of agent identities participating in the decision-making process.
     */
    constructor(agents) {
        this.agents = agents;
        this.decisions = new Map(); // Store decisions made
    }

    /**
     * Proposes a decision based on agent input.
     * @param {string} decisionId - Unique identifier for the decision.
     * @param {string} proposal - Description of the proposal being made.
     */
    proposeDecision(decisionId, proposal) {
        if (this.decisions.has(decisionId)) {
            throw new Error(`Decision ${decisionId} already proposed.`);
        }
        this.decisions.set(decisionId, {
            proposal,
            votes: new Map(),
            result: null
        });
    }

    /**
     * Casts a vote on a given decision.
     * @param {string} decisionId - The ID of the decision being voted on.
     * @param {string} agentId - The ID of the agent casting the vote.
     * @param {boolean} vote - The vote value (true for yes, false for no).
     */
    castVote(decisionId, agentId, vote) {
        const decision = this.decisions.get(decisionId);
        if (!decision) {
            throw new Error(`Decision ${decisionId} not found.`);
        }
        if (decision.votes.has(agentId)) {
            throw new Error(`Agent ${agentId} has already voted on ${decisionId}.`);
        }
        decision.votes.set(agentId, vote);
    }

    /**
     * Finalizes the decision based on the votes cast.
     * @param {string} decisionId - The ID of the decision to finalize.
     */
    finalizeDecision(decisionId) {
        const decision = this.decisions.get(decisionId);
        if (!decision) {
            throw new Error(`Decision ${decisionId} not found.`);
        }
        const totalVotes = decision.votes.size;
        const yesVotes = Array.from(decision.votes.values()).filter(vote => vote).length;

        if (yesVotes > totalVotes / 2) {
            decision.result = 'approved';
        } else {
            decision.result = 'rejected';
        }
    }

    /**
     * Gets the result of a finalized decision.
     * @param {string} decisionId - The ID of the decision.
     * @returns {string|null} - The result of the decision or null if not finalized.
     */
    getDecisionResult(decisionId) {
        const decision = this.decisions.get(decisionId);
        return decision ? decision.result : null;
    }
}

module.exports = DecisionMaking;