/**
 * AgentActivityTracker - Tracks and records activities of agents in the system.
 * 
 * This class monitors agent actions and interactions, storing relevant data for analysis
 * and decision-making. It aids in understanding the behavior and performance of agents
 * within the environment.
 * 
 * @class
 */
class AgentActivityTracker {
    constructor() {
        this.activityLog = [];
    }

    /**
     * Records a new activity for an agent.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @param {string} action - Action performed by the agent.
     * @param {object} details - Additional details about the action.
     * @memberof AgentActivityTracker
     */
    recordActivity(agentId, action, details = {}) {
        const timestamp = new Date().toISOString();
        this.activityLog.push({ agentId, action, details, timestamp });
    }

    /**
     * Retrieves the activity log for a specific agent.
     * 
     * @param {string} agentId - Unique identifier for the agent.
     * @returns {Array} - Array of activities recorded for the agent.
     * @memberof AgentActivityTracker
     */
    getActivitiesForAgent(agentId) {
        return this.activityLog.filter(activity => activity.agentId === agentId);
    }

    /**
     * Retrieves the complete activity log.
     * 
     * @returns {Array} - Array of all recorded activities.
     * @memberof AgentActivityTracker
     */
    getAllActivities() {
        return this.activityLog;
    }

    /**
     * Clears the activity log.
     * Use with caution, as this will delete all recorded activity.
     * 
     * @memberof AgentActivityTracker
     */
    clearLog() {
        this.activityLog = [];
    }
}

module.exports = AgentActivityTracker;