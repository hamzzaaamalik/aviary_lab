import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    2: [2, 3, 4, 5],
    4: [4, 5]
  });
});

test('classify handles empty inputs', () => {
  const inputs = [];
  const thresholds = { low: 1 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {});
});

test('classify throws error for invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { low: 'not a number' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: null }), TypeError);
});

test('classify throws error for invalid inputs', () => {
  const inputs = [1, 'two', 3];
  const thresholds = { low: 1 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

