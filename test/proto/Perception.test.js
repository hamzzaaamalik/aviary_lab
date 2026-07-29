import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholdsMap = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholdsMap);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify with empty input', () => {
  const inputs = [];
  const thresholdsMap = { low: 2 };
  const result = perception.classify(inputs, thresholdsMap);
  assert.deepEqual(result, {});
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  const thresholdsMap = { low: 'not-a-number' };
  assert.throws(() => perception.classify(inputs, thresholdsMap), TypeError);
});

test('classify throws on invalid inputs', () => {
  const inputs = [1, 2, null];
  const thresholdsMap = { low: 1 };
  assert.throws(() => perception.classify(inputs, thresholdsMap), TypeError);
});

test('classify throws on non-array inputs', () => {
  const inputs = 'not-an-array';
  const thresholdsMap = { low: 1 };
  assert.throws(() => perception.classify(inputs, thresholdsMap), TypeError);
});

test('classify throws on invalid thresholdsMap', () => {
  const inputs = [1, 2, 3];
  const thresholdsMap = null;
  assert.throws(() => perception.classify(inputs, thresholdsMap), TypeError);
});
