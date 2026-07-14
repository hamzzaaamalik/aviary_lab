/**
 * SkillManager handles the registration, invocation, and management of skills.
 * This class maintains a registry of skills and provides mechanisms to execute them safely.
 *
 * @class SkillManager
 */
class SkillManager {
    constructor() {
        /**
         * @type {Map<string, SkillInterface>}
         * @private
         */
        this.skills = new Map();
    }

    /**
     * Registers a new skill to the manager.
     * @param {string} skillName - The unique name of the skill.
     * @param {SkillInterface} skill - The skill instance to register.
     * @throws {Error} Throws an error if the skill name is already registered.
     */
    registerSkill(skillName, skill) {
        if (this.skills.has(skillName)) {
            throw new Error(`Skill ${skillName} is already registered.`);
        }
        this.skills.set(skillName, skill);
    }

    /**
     * Invokes a skill by its name with provided arguments.
     * @param {string} skillName - The name of the skill to invoke.
     * @param {...any} args - The arguments to pass to the skill.
     * @returns {Promise<any>} - A promise resolving with the skill's result.
     * @throws {Error} Throws an error if the skill is not found.
     */
    async invokeSkill(skillName, ...args) {
        const skill = this.skills.get(skillName);
        if (!skill) {
            throw new Error(`Skill ${skillName} not found.`);
        }
        return await skill.execute(...args);
    }

    /**
     * Removes a skill from the manager.
     * @param {string} skillName - The name of the skill to remove.
     * @throws {Error} Throws an error if the skill is not found.
     */
    removeSkill(skillName) {
        if (!this.skills.delete(skillName)) {
            throw new Error(`Skill ${skillName} not found, cannot remove.`);
        }
    }

    /**
     * Retrieves a list of all registered skill names.
     * @returns {string[]} - An array containing names of all registered skills.
     */
    getRegisteredSkills() {
        return Array.from(this.skills.keys());
    }
}

module.exports = SkillManager;
