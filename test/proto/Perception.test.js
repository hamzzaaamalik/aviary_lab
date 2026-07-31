import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 0, medium: 25, high: 45 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [10, 20, 30, 40, 50], medium: [30, 40, 50], high: [50] });
});

test('classify throws for invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
});

test('classify throws for empty sensory inputs', () => {
  const thresholds = { low: 0 };
  assert.throws(() => perception.classify([], thresholds), TypeError);
});

test('classify throws for invalid thresholdsMap structure', () => {
  const inputs = [10, 20];
  assert.throws(() => perception.classify(inputs, null), TypeError);
});

