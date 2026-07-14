class MemoryManager {
  constructor() {
    this.storage = {};
  }

  set(key, value) {
    this.storage[key] = value;
  }

  get(key) {
    return this.storage[key] !== undefined ? this.storage[key] : null;
  }

  delete(key) {
    if (this.storage[key]) {
      delete this.storage[key];
    }
  }

  clear() {
    this.storage = {};
  }
}

const memory = new MemoryManager();

// Expose memory functions for proto to use
module.exports = memory;