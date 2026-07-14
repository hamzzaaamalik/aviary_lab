// src/memory.js

const MemoryBank = (() => {
    const memories = {};

    const addMemory = (key, value) => {
        memories[key] = value;
        console.log(`Memory added: ${key} -> ${value}`);
    };

    const retrieveMemory = (key) => {
        if (memories[key]) {
            console.log(`Memory retrieved: ${key} -> ${memories[key]}`);
            return memories[key];
        } else {
            console.log(`No memory found for: ${key}`);
            return null;
        }
    };

    const listMemories = () => {
        console.log('Current memories:', memories);
        return memories;
    };

    return {
        addMemory,
        retrieveMemory,
        listMemories,
    };
})();

// Export MemoryBank for use in other modules
export default MemoryBank;