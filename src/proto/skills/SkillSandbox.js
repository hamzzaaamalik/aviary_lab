// SkillSandbox.js

/**
 * A sandbox for safely invoking skills while managing their environment.
 * @module SkillSandbox
 */

class SkillSandbox {
    /**
     * Creates an instance of SkillSandbox.
     * @param {Function} skill - The skill to be invoked within the sandbox.
     */
    constructor(skill) {
        if (typeof skill !== 'function') {
            throw new Error('Invalid skill: must be a function.');
        }
        this.skill = skill;
    }

    /**
     * Invokes the skill with the provided context and parameters.
     * @param {Object} context - The context in which to invoke the skill.
     * @param {...*} args - Arguments to pass to the skill.
     * @returns {*} The result of the skill invocation.
     * @throws {Error} If the skill invocation fails.
     */
    invoke(context, ...args) {
        try {
            // Bind the skill to the provided context to ensure proper 'this' reference.
            const boundSkill = this.skill.bind(context);
            return boundSkill(...args);
        } catch (error) {
            throw new Error(`Skill invocation failed: ${error.message}`);
        }
    }
}

export default SkillSandbox;
