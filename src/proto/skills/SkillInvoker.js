/**  
 * SkillInvoker class for managing skill invocation.  
 * This class allows for registering, invoking, and sandboxing skills.  
 */  
class SkillInvoker {  
    constructor() {  
        this.skills = new Map();  
    }  

    /**  
     * Registers a skill with a unique name and implementation.  
     * @param {string} name - The unique name of the skill.  
     * @param {function} skillFunction - The function implementing the skill logic.  
     * @throws Will throw an error if the skill name is already registered.  
     */  
    registerSkill(name, skillFunction) {  
        if (this.skills.has(name)) {  
            throw new Error(`Skill '${name}' is already registered.`);  
        }  
        this.skills.set(name, skillFunction);  
    }  

    /**  
     * Invokes a registered skill by name with provided arguments.  
     * @param {string} name - The name of the skill to invoke.  
     * @param {...any} args - Arguments to pass to the skill function.  
     * @returns {any} - The return value of the invoked skill function.  
     * @throws Will throw an error if the skill is not registered.  
     */  
    invokeSkill(name, ...args) {  
        if (!this.skills.has(name)) {  
            throw new Error(`Skill '${name}' is not registered.`);  
        }  
        const skillFunction = this.skills.get(name);  
        return skillFunction(...args);  
    }  

    /**  
     * Lists all registered skill names.  
     * @returns {Array<string>} - An array of registered skill names.  
     */  
    listSkills() {  
        return Array.from(this.skills.keys());  
    }  
}  

module.exports = SkillInvoker;