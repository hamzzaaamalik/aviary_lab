/**
 * SkillManager class to manage the registration, invocation, and execution of skills.
 * @class
 */
class SkillManager {
    constructor() {
        this.skills = new Map();
    }

    /**
     * Registers a new skill.
     * @param {string} skillName - The name of the skill.
     * @param {Function} skillFunction - The function implementing the skill.
     * @throws {Error} Throws an error if the skill is already registered.
     */
    registerSkill(skillName, skillFunction) {
        if (this.skills.has(skillName)) {
            throw new Error(`Skill '${skillName}' is already registered.`);
        }
        this.skills.set(skillName, skillFunction);
    }

    /**
     * Invokes a registered skill by name.
     * @param {string} skillName - The name of the skill to invoke.
     * @param {...any} args - Arguments to pass to the skill function.
     * @returns {any} The result of the skill execution.
     * @throws {Error} Throws an error if the skill is not found.
     */
    invokeSkill(skillName, ...args) {
        const skillFunction = this.skills.get(skillName);
        if (!skillFunction) {
            throw new Error(`Skill '${skillName}' not found.`);
        }
        return skillFunction(...args);
    }

    /**
     * Returns a list of all registered skills.
     * @returns {Array<string>} Array of skill names.
     */
    listSkills() {
        return Array.from(this.skills.keys());
    }
}

module.exports = SkillManager;