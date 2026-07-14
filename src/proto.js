class Proto {
    constructor() {
        this.knowledge = {};
        this.learningRate = 0.1;
    }

    learn(input, output) {
        // adjust knowledge based on input and expected output
        if (!this.knowledge[input]) {
            this.knowledge[input] = output;
        } else {
            this.knowledge[input] += (output - this.knowledge[input]) * this.learningRate;
        }
    }

    predict(input) {
        return this.knowledge[input] || null;
    }

    get allKnowledge() {
        return this.knowledge;
    }
}

export default Proto;
