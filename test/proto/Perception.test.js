import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    high: 4
  };
  const expected = {
    low: [2, 3, 4, 5],
    high: [4, 5]
  };
  assert.deepEqual(perception.classify(inputs, categories), expected);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

// Existing tests...

