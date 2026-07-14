/**
 * SkillInterface defines the structure for all skills in the PROTO framework.
 * Skills must implement the invoke method to be executed by the SkillManager.
 */
class SkillInterface {
    /**
     * Execute the skill with the given parameters.
     * @param {Object} params - The parameters required for the skill execution.
     * @returns {Promise<any>} - Result of the skill execution.
     * @throws {Error} - Throws an error if execution fails.
     */
    async invoke(params) {
        throw new Error('invoke method not implemented');
    }

    /**
     * Get the skill's name.
     * @returns {string} - The name of the skill.
     */
    getName() {
        throw new Error('getName method not implemented');
    }
}

export default SkillInterface;