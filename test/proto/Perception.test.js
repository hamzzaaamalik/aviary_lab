import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid thresholdsMap', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 1 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify validates thresholds correctly', () => {
  const inputs = [1, 2, 3];
  const thresholds = { valid: 1, invalid: NaN };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});
