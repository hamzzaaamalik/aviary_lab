class Memory {
    constructor() {
        this.storage = {};
    }
    
    save(key, value) {
        this.storage[key] = value;
    }
    
    load(key) {
        return this.storage[key] || null;
    }
    
    remove(key) {
        delete this.storage[key];
    }
    
    clear() {
        this.storage = {};
    }
    
    getAll() {
        return this.storage;
    }
}

const protoMemory = new Memory();

// example usage
protoMemory.save('favoriteFood', 'pizza');
console.log(protoMemory.load('favoriteFood')); // pizza

export default protoMemory;