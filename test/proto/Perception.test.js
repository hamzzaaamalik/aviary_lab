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

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: 'not-a-number' }), TypeError);
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([1, 2, null], { low: 1 }), TypeError);
});

test('classify returns empty arrays for all inputs below thresholds', () => {
  const inputs = [1, 1.5, 1.9];
  const thresholds = { low: 2, high: 3 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [], high: [] });
});
