import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify sensory inputs', () => {
  const inputs = [1, 5, 10, 20];
  const categories = {
    low: 5,
    medium: 10,
    high: 15,
  };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, {
    low: { inputs: [5, 10, 20], count: 3 },
    medium: { inputs: [10, 20], count: 2 },
    high: { inputs: [20], count: 1 },
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const categories = { invalid: NaN };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});
