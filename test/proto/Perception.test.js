import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    high: [4, 5]
  });
});

test('classify handles empty inputs gracefully', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify(null, { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, null], { low: 1 }), TypeError);
});
