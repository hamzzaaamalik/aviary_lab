import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws if inputs is not an array', () => {
  assert.throws(() => perception.classify({}, {}), TypeError);
});

test('classify throws if inputs is empty', () => {
  assert.throws(() => perception.classify([], {}), TypeError);
});

test('classify throws if thresholdsMap is invalid', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
});

test('classify returns correct categories', () => {
  const thresholdsMap = { low: 1, high: 2 };
  const inputs = [0, 1, 2, 3];
  const result = perception.classify(inputs, thresholdsMap);
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});

test('classify handles non-finite thresholds', () => {
  const thresholdsMap = { low: NaN, high: Infinity };
  const inputs = [0, 1, 2, 3];
  assert.throws(() => perception.classify(inputs, thresholdsMap), TypeError);
});
