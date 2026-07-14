/**
 * Proposals module for governance.
 * Handles creating, validating, and managing proposals within the governance framework.
 */
class Proposals {
    constructor() {
        this.proposals = [];
    }

    /**
     * Create a new proposal.
     * @param {string} title - The title of the proposal.
     * @param {string} description - The description of the proposal.
     * @returns {Object} The created proposal object.
     */
    createProposal(title, description) {
        this.validateProposal(title, description);
        const proposal = { id: this.proposals.length + 1, title, description, createdAt: new Date() };
        this.proposals.push(proposal);
        return proposal;
    }

    /**
     * Validate the proposal's title and description.
     * @param {string} title - The title of the proposal.
     * @param {string} description - The description of the proposal.
     * @throws {Error} If validation fails.
     */
    validateProposal(title, description) {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Invalid proposal title.');
        }
        if (!description || typeof description !== 'string' || description.trim() === '') {
            throw new Error('Invalid proposal description.');
        }
    }

    /**
     * Get all proposals.
     * @returns {Array} Array of proposals.
     */
    getAllProposals() {
        return this.proposals;
    }
}

module.exports = new Proposals();