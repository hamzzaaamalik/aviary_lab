/**
 * SkillInvoker class to manage the invocation of skills in an isolated environment.
 * Provides an interface for executing skills with input validation and error handling.
 * 
 * @module SkillInvoker
 */

class SkillInvoker {
    /**
     * Creates an instance of SkillInvoker.
     * @param {SkillRegistry} skillRegistry - The registry of available skills.
     * @param {SkillSandbox} skillSandbox - The sandbox for skill execution.
     */
    constructor(skillRegistry, skillSandbox) {
        this.skillRegistry = skillRegistry;
        this.skillSandbox = skillSandbox;
    }

    /**
     * Invokes a skill by its name with provided input.
     * @param {string} skillName - The name of the skill to invoke.
     * @param {Object} input - The input parameters for the skill.
     * @returns {Promise<any>} The result of the skill execution.
     * @throws {Error} If the skill does not exist or fails to execute.
     */
    async invoke(skillName, input) {
        if (!this.skillRegistry.hasSkill(skillName)) {
            throw new Error(`Skill '${skillName}' not found in registry.`);
        }

        const skill = this.skillRegistry.getSkill(skillName);

        return this.skillSandbox.execute(skill, input);
    }
}

export default SkillInvoker;
