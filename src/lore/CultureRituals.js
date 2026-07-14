/**
 * CultureRituals.js
 * This module manages the cultural rituals within the PROTO framework, promoting shared practices and community engagement.
 */

class CultureRituals {
    constructor() {
        this.rituals = [];
    }

    /**
     * Add a new ritual to the culture.
     * @param {string} name - The name of the ritual.
     * @param {string} description - A short description of what the ritual entails.
     * @param {Function} perform - A function that defines the ritual's actions when performed.
     */
    addRitual(name, description, perform) {
        if (this.rituals.find(ritual => ritual.name === name)) {
            throw new Error(`Ritual with name ${name} already exists.`);
        }

        const ritual = { name, description, perform };
        this.rituals.push(ritual);
    }

    /**
     * Perform a specified ritual by its name.
     * @param {string} name - The name of the ritual to perform.
     * @throws Will throw an error if the ritual does not exist.
     */
    performRitual(name) {
        const ritual = this.rituals.find(ritual => ritual.name === name);
        if (!ritual) {
            throw new Error(`Ritual ${name} not found.`);
        }

        console.log(`Performing ritual: ${ritual.name}`);
        ritual.perform();
    }

    /**
     * Retrieve all rituals in the culture.
     * @returns {Array} - An array of all rituals with their names and descriptions.
     */
    getAllRituals() {
        return this.rituals.map(ritual => ({ name: ritual.name, description: ritual.description }));
    }
}

// Export an instance for global access within the lore module
const cultureRituals = new CultureRituals();

// Sample rituals
cultureRituals.addRitual('Welcome Ceremony', 'A ritual to welcome new members into the community.', () => {
    console.log('Welcoming new members with open arms!');
});

cultureRituals.addRitual('Knowledge Sharing', 'An event to share insights and learnings among the community.', () => {
    console.log('Sharing knowledge like it’s hot!');
});

export default cultureRituals;
