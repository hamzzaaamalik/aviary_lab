import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests... (assumed to be present)

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { cat: 0 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify works with valid categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify handles thresholds correctly', () => {
  const inputs = [1, 3, 5];
  const categories = { one: 0, three: 3, five: 5 };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, { one: [1, 3, 5], three: [3, 5], five: [5] });
});

// Additional edge case tests as required...
