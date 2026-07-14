class Proto {
    constructor() {
        this.knowledgeBase = new Map();
        this.context = {};
    }

    learn(key, value) {
        this.knowledgeBase.set(key, value);
    }

    recall(key) {
        return this.knowledgeBase.get(key) || null;
    }

    updateContext(newContext) {
        this.context = { ...this.context, ...newContext};
    }

    reason(query) {
        // basic reasoning placeholder
        return this.recall(query) || 'unknown';
    }
}

export default Proto;
