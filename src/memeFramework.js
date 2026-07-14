// memeFramework.js - a modular approach to meme generation

class MemeFramework {
    constructor() {
        this.memeTemplates = [];
    }

    addTemplate(template) {
        if (this.validateTemplate(template)) {
            this.memeTemplates.push(template);
            console.log('Template added:', template);
        } else {
            console.error('Invalid template:', template);
        }
    }

    validateTemplate(template) {
        // Ensure the template has necessary properties
        return template && template.id && template.content;
    }

    generateMeme(templateId, context) {
        const template = this.memeTemplates.find(t => t.id === templateId);
        if (!template) {
            console.error('Template not found:', templateId);
            return '';
        }
        return this.fillTemplate(template.content, context);
    }

    fillTemplate(content, context) {
        // Replace placeholders with actual context
        return content.replace(/\{(.*?)\}/g, (_, key) => context[key] || '');
    }
}

export default MemeFramework;
