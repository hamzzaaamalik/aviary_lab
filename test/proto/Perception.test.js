import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs based on thresholds', () => {
  const inputs = [5, 10, 15, 20];
  const thresholds = { low: 0, medium: 10, high: 15 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [5, 10, 15, 20], medium: [10, 15, 20], high: [15, 20] });
});

test('classify throws TypeError for empty sensory inputs', () => {
  const thresholds = { low: 0 };
  assert.throws(() => perception.classify([], thresholds), TypeError);
});

test('classify throws TypeError for invalid thresholds map', () => {
  const inputs = [5, 10];
  const invalidThresholds = { low: 'not-a-number' };
  assert.throws(() => perception.classify(inputs, invalidThresholds), TypeError);
});

test('classify throws TypeError for non-object thresholds', () => {
  const inputs = [5, 10];
  assert.throws(() => perception.classify(inputs, null), TypeError);
});

test('classify throws TypeError for invalid input types', () => {
  const inputs = [5, 'not-a-number'];
  const thresholds = { low: 0 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

