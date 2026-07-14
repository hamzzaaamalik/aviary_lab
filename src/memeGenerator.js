class MemeGenerator {
    constructor() {
        this.templates = [];
        this.currentMeme = null;
    }

    addTemplate(template) {
        if (this.validateTemplate(template)) {
            this.templates.push(template);
        } else {
            throw new Error('Invalid template structure.');
        }
    }

    validateTemplate(template) {
        // Ensure template has necessary properties.
        return template.hasOwnProperty('text') && template.hasOwnProperty('image');
    }

    generateMeme() {
        if (this.templates.length === 0) {
            throw new Error('No templates available.');
        }
        const randomTemplate = this.templates[Math.floor(Math.random() * this.templates.length)];
        this.currentMeme = {
            text: randomTemplate.text,
            image: randomTemplate.image,
            createdAt: new Date()
        };
        return this.currentMeme;
    }
}

export default MemeGenerator;