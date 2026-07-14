class Proto {
    constructor() {
        this.memory = {};
        this.complexity = 0;
    }

    store(key, value) {
        this.memory[key] = value;
        this.complexity += this.calculateComplexity(value);
    }

    retrieve(key) {
        return this.memory[key] || null;
    }

    calculateComplexity(value) {
        return typeof value === 'object' ? Object.keys(value).length : 1;
    }

    clear() {
        this.memory = {};
        this.complexity = 0;
    }

    status() {
        return { size: Object.keys(this.memory).length, complexity: this.complexity };
    }
}

export default Proto;