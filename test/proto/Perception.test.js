import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { 
    low: { inputs: [2, 3, 4, 5], count: 4 }, 
    high: { inputs: [4, 5], count: 2 } 
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: NaN }), TypeError);
});

// More tests as needed...

