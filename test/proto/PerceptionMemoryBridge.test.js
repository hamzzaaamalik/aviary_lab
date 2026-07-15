import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PerceptionMemoryBridge } from '../../src/proto/perception/PerceptionMemoryBridge.js';

class MockMemory {
    constructor() {
        this.storeData = {};
    }
    store(percept) {
        this.storeData[percept.id] = percept;
    }
    retrieve(key) {
        return this.storeData[key] || null;
    }
}

test('savePercept stores a valid percept', () => {
    const memory = new MockMemory();
    const bridge = new PerceptionMemoryBridge(memory);
    const percept = { id: '1', data: 'test percept' };
    bridge.savePercept(percept);
    assert.deepEqual(memory.storeData['1'], percept);
});

test('retrievePercept retrieves a stored percept', () => {
    const memory = new MockMemory();
    const bridge = new PerceptionMemoryBridge(memory);
    const percept = { id: '1', data: 'test percept' };
    bridge.savePercept(percept);
    const retrieved = bridge.retrievePercept('1');
    assert.deepEqual(retrieved, percept);
});

test('savePercept throws on invalid percept', () => {
    const memory = new MockMemory();
    const bridge = new PerceptionMemoryBridge(memory);
    assert.throws(() => bridge.savePercept(null), { message: 'Invalid percept' });
});

test('retrievePercept returns null for non-existent key', () => {
    const memory = new MockMemory();
    const bridge = new PerceptionMemoryBridge(memory);
    const retrieved = bridge.retrievePercept('nonexistent');
    assert.equal(retrieved, null);
});
