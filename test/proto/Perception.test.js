import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50]
  });
});

test('classify throws for invalid thresholdsMap', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
});

test('classify throws for empty sensoryInputs', () => {
  assert.throws(() => perception.classify([], { low: 15 }), TypeError);
});

test('classify throws for non-finite thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
});

