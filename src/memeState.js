class MemeState {
    constructor() {
        this.state = {};
    }

    setState(key, value) {
        if (typeof key !== 'string') {
            throw new Error('State key must be a string.');
        }
        this.state[key] = value;
    }

    getState(key) {
        return this.state[key];
    }

    clearState() {
        this.state = {};
    }
}

const memeState = new MemeState();
export default memeState;