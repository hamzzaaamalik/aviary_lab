import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, mid: 3, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], mid: [3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'a' }), TypeError);
});

// Additional tests for edge cases can be added here.
