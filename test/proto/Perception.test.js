import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs into categories based on thresholds', () => {
  const inputs = [1, 5, 10, 15, 20];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15, 20],
    medium: [10, 15, 20],
    high: [15, 20]
  });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { low: NaN }; // Non-finite threshold
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

