import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns classified sensory inputs', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 10, medium: 30, high: 50 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: { inputs: [10, 20, 30, 40, 50], count: 5 },
    medium: { inputs: [30, 40, 50], count: 3 },
    high: { inputs: [50], count: 1 }
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 10 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([10, 20], null), TypeError);
  assert.throws(() => perception.classify([10, 20], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const categories = { low: 10, invalid: 'not-a-number' };
  assert.throws(() => perception.classify([10, 20], categories), TypeError);
});

