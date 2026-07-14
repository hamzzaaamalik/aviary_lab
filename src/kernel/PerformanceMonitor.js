/**
 * PerformanceMonitor class manages and tracks the performance metrics of agents in the system.
 * It collects data, analyzes performance, and provides insights for optimization.
 */
class PerformanceMonitor {
    constructor() {
        this.agentMetrics = new Map();
    }

    /**
     * Initializes performance monitoring for a specific agent.
     * @param {string} agentId - The unique identifier of the agent.
     */
    initializeAgent(agentId) {
        if (!this.agentMetrics.has(agentId)) {
            this.agentMetrics.set(agentId, { actions: [], lastUpdated: Date.now() });
        }
    }

    /**
     * Records an action taken by an agent.
     * @param {string} agentId - The unique identifier of the agent.
     * @param {string} action - Description of the action performed.
     */
    recordAction(agentId, action) {
        if (this.agentMetrics.has(agentId)) {
            const metrics = this.agentMetrics.get(agentId);
            metrics.actions.push({ action, timestamp: Date.now() });
            metrics.lastUpdated = Date.now();
        }
    }

    /**
     * Retrieves the performance metrics for a specific agent.
     * @param {string} agentId - The unique identifier of the agent.
     * @returns {Object|null} - The performance metrics or null if not found.
     */
    getMetrics(agentId) {
        return this.agentMetrics.get(agentId) || null;
    }

    /**
     * Analyzes the performance of all agents and returns insights.
     * @returns {Object} - Summary of performance insights.
     */
    analyzePerformance() {
        const insights = {};
        this.agentMetrics.forEach((metrics, agentId) => {
            insights[agentId] = {
                actionCount: metrics.actions.length,
                lastActive: new Date(metrics.lastUpdated).toISOString(),
                recentActions: metrics.actions.slice(-5),
            };
        });
        return insights;
    }
}

module.exports = PerformanceMonitor;