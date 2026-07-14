const Memory = (() => {
    const shortTerm = new Map();  // stores short-term memories
    const longTerm = new Map();   // stores long-term memories

    const addShortTerm = (key, value) => {
        shortTerm.set(key, value);
    };

    const addLongTerm = (key, value) => {
        longTerm.set(key, value);
    };

    const recallShortTerm = (key) => {
        return shortTerm.get(key) || 'memory not found';
    };

    const recallLongTerm = (key) => {
        return longTerm.get(key) || 'memory not found';
    };

    const clearShortTerm = () => {
        shortTerm.clear();
    };

    const clearLongTerm = () => {
        longTerm.clear();
    };

    return {
        addShortTerm,
        addLongTerm,
        recallShortTerm,
        recallLongTerm,
        clearShortTerm,
        clearLongTerm
    };
})();

export default Memory;