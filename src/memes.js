class MemeGenerator {
    constructor() {
        this.templates = [];
    }

    addTemplate(template) {
        if (typeof template !== 'string' || template.trim() === '') {
            throw new Error('Invalid template');
        }
        this.templates.push(template);
    }

    generateMeme(context) {
        if (this.templates.length === 0) {
            throw new Error('No templates available');
        }
        const template = this.templates[Math.floor(Math.random() * this.templates.length)];
        return this.applyContextToTemplate(template, context);
    }

    applyContextToTemplate(template, context) {
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return context[key] || match;
        });
    }
}

export default MemeGenerator;