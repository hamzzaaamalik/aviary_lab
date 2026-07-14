/**\
 * AgentInteractionTracker.js\
 *\
 * This module tracks interactions between agents within the world,\
 * enabling dynamic response and evolution based on agent behaviors.\
 *\
 * @module AgentInteractionTracker\
 */\
\
class AgentInteractionTracker {\
    constructor() {\
        this.interactions = [];\
    }\
\
    /**\
     * Records a new interaction between two agents.\
     *\
     * @param {string} agentId1 - The ID of the first agent.\
     * @param {string} agentId2 - The ID of the second agent.\
     * @param {string} interactionType - The type of interaction (e.g., "communication", "conflict").\
     * @param {Date} timestamp - The time the interaction occurred.\
     */\
    recordInteraction(agentId1, agentId2, interactionType, timestamp = new Date()) {\
        this.interactions.push({\
            agentId1,\
            agentId2,\
            interactionType,\
            timestamp\
        });\
    }\
\
    /**\
     * Retrieves all interactions for a specific agent.\
     *\
     * @param {string} agentId - The ID of the agent to retrieve interactions for.\
     * @returns {Array} An array of interaction records for the specified agent.\
     */\
    getInteractionsForAgent(agentId) {\
        return this.interactions.filter(interaction => interaction.agentId1 === agentId || interaction.agentId2 === agentId);\
    }\
\
    /**\
     * Gets the total count of interactions recorded.\
     *\
     * @returns {number} The total number of interactions.\
     */\
    getTotalInteractions() {\
        return this.interactions.length;\
    }\
\
    /**\
     * Clears all recorded interactions. This may be useful for resetting the tracker.\
     */\
    clearInteractions() {\
        this.interactions = [];\
    }\
}\
\
module.exports = AgentInteractionTracker;