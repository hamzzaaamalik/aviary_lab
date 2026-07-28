import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    '15': [20, 30, 40],
    '25': [30, 40]
  });
});

test('classify throws for invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'string' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
});

test('classify handles empty inputs', () => {
  const thresholds = { low: 15 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify merges categories with the same threshold', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, high: 30 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    '15': [20, 30, 40],
    '30': [30, 40]
  });
});
