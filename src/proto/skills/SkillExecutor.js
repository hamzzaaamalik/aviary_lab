/**
 * SkillExecutor is responsible for executing skills registered in the SkillRegistry.
 * It handles invocation, execution context, and error management.
 *
 * @class SkillExecutor
 */
class SkillExecutor {
    constructor(skillRegistry, skillSandbox) {
        this.skillRegistry = skillRegistry;
        this.skillSandbox = skillSandbox;
    }
    
    /**
     * Executes a skill by its name with the provided parameters.
     * @param {string} skillName - The name of the skill to execute.
     * @param {Object} params - Parameters to pass to the skill.
     * @returns {Promise<any>} - Result of the skill execution.
     * @throws {Error} - Throws error if skill is not found or execution fails.
     */
    async executeSkill(skillName, params) {
        const skill = this.skillRegistry.getSkill(skillName);
        if (!skill) {
            throw new Error(`Skill '${skillName}' not found in the registry.`);
        }
        
        const executionContext = this.skillSandbox.createExecutionContext(skill);
        try {
            const result = await executionContext.invoke(params);
            return result;
        } catch (error) {
            throw new Error(`Failed to execute skill '${skillName}': ${error.message}`);
        }
    }
}

module.exports = SkillExecutor;