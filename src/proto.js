class Proto {
    constructor() {
        this.memory = {};
        this.thoughts = [];
    }

    remember(key, value) {
        this.memory[key] = value;
    }

    recall(key) {
        return this.memory[key] || null;
    }

    think(input) {
        const output = this.process(input);
        this.thoughts.push(output);
        return output;
    }

    process(input) {
        // basic reasoning algorithm
        return `processed: ${input}`;
    }
}

const proto = new Proto();

// export instance for external access
module.exports = proto;