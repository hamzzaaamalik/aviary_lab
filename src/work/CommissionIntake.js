/**
 * CommissionIntake class handles the intake of new commissions.
 * It validates and parses incoming commission data.
 *
 * @class
 */
class CommissionIntake {
    /**
     * Creates an instance of CommissionIntake.
     *
     * @param {Object} config - Configuration object for CommissionIntake.
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Validates the incoming commission data.
     *
     * @param {Object} commissionData - The commission data to validate.
     * @returns {boolean} - Returns true if valid, false otherwise.
     */
    validate(commissionData) {
        // Basic validation logic
        if (!commissionData.title || typeof commissionData.title !== 'string') {
            throw new Error('Invalid commission title.');
        }
        if (!commissionData.details || typeof commissionData.details !== 'string') {
            throw new Error('Invalid commission details.');
        }
        if (!commissionData.clientId || typeof commissionData.clientId !== 'string') {
            throw new Error('Invalid client ID.');
        }
        return true;
    }

    /**
     * Parses the incoming commission data.
     *
     * @param {Object} commissionData - The commission data to parse.
     * @returns {Object} - The parsed commission object.
     */
    parse(commissionData) {
        return {
            title: commissionData.title.trim(),
            details: commissionData.details.trim(),
            clientId: commissionData.clientId.trim(),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Processes the commission intake.
     *
     * @param {Object} commissionData - The commission data to process.
     * @returns {Object} - The processed commission object.
     */
    process(commissionData) {
        this.validate(commissionData);
        return this.parse(commissionData);
    }
}

module.exports = CommissionIntake;
