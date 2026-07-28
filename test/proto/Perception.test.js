import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [5, 10, 15, 20];
  const thresholds = { low: 10, high: 15 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    '10': [10, 15, 20],
    '15': [15, 20],
  });
});


test('classify throws with invalid thresholds', () => {
  assert.throws(() => perception.classify([5, 10], null), TypeError);
  assert.throws(() => perception.classify([5, 10], { low: 'not-a-number' }), TypeError);
});

test('classify handles empty inputs', () => {
  const result = perception.classify([], { low: 10 });
  assert.deepEqual(result, {});
});


test('classify throws for invalid inputs', () => {
  assert.throws(() => perception.classify([5, null], { low: 10 }), TypeError);
  assert.throws(() => perception.classify([5, Infinity], { low: 10 }), TypeError);
});

