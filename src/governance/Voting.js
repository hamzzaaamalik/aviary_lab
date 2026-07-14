/**
 * Voting class facilitates a simple majority voting system among agents.
 * It allows agents to propose options and cast votes, determining the outcome based on majority rules.
 */
class Voting {
    /**
     * Initializes the voting instance with options and an empty vote count.
     * @param {Array<string>} options - The options available for voting.
     */
    constructor(options) {
        this.options = options;
        this.votes = new Map();
        this.totalVotes = 0;
        this.votingOpen = false;
    }

    /**
     * Opens the voting period, allowing agents to cast their votes.
     */
    openVoting() {
        this.votingOpen = true;
        this.votes.clear();
        this.totalVotes = 0;
    }

    /**
     * Closes the voting period and calculates the winning option.
     * @returns {string|null} - The winning option or null if no votes were cast.
     */
    closeVoting() {
        this.votingOpen = false;
        return this.calculateWinner();
    }

    /**
     * Casts a vote for a specified option if the voting is open.
     * @param {string} agentId - The ID of the agent casting the vote.
     * @param {string} option - The option being voted for.
     * @throws Will throw an error if the voting is closed or the option is invalid.
     */
    castVote(agentId, option) {
        if (!this.votingOpen) {
            throw new Error('Voting is closed.');
        }
        if (!this.options.includes(option)) {
            throw new Error('Invalid voting option.');
        }

        // Record the vote
        if (!this.votes.has(option)) {
            this.votes.set(option, new Set());
        }
        this.votes.get(option).add(agentId);
        this.totalVotes++;
    }

    /**
     * Calculates the winning option based on the votes cast.
     * @returns {string|null} - The winning option or null if no votes were cast.
     */
    calculateWinner() {
        if (this.totalVotes === 0) {
            return null;
        }
        let winner = null;
        let maxVotes = 0;

        for (const [option, voters] of this.votes.entries()) {
            if (voters.size > maxVotes) {
                maxVotes = voters.size;
                winner = option;
            }
        }
        return winner;
    }
}

module.exports = Voting;