import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs correctly', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify throws on invalid thresholdsMap', () => {
  const inputs = [10, 20, 30];
  const invalidThresholds = { low: 'low', medium: null };
  assert.throws(() => perception.classify(inputs, invalidThresholds), TypeError);
});

test('classify throws on empty sensoryInputs', () => {
  const thresholds = { low: 15 };
  assert.throws(() => perception.classify([], thresholds), TypeError);
});

test('classify throws on invalid inputs', () => {
  const inputs = [10, null, 30];
  const thresholds = { low: 15 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});
