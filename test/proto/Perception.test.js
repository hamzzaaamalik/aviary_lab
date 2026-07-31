import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty sensoryInputs', () => {
  assert.throws(() => perception.classify([], { low: 2 }), TypeError);
});

test('classify throws on invalid thresholdsMap', () => {
  assert.throws(() => perception.classify([1, 2], 'not-a-map'), TypeError);
});

test('classify throws on invalid threshold values', () => {
  const thresholds = { low: Infinity };
  assert.throws(() => perception.classify([1, 2, 3], thresholds), TypeError);
});

// Add more tests as needed for additional coverage.