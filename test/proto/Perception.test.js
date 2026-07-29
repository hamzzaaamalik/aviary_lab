import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, high: 25 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    high: [30, 40]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 15 }), TypeError);
});

test('classify throws on invalid thresholdsMap', () => {
  assert.throws(() => perception.classify([10], 'not-an-object'), TypeError);
});

test('classify handles no matching categories', () => {
  const inputs = [1, 2, 3];
  const thresholds = { high: 10 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { high: [] });
});
