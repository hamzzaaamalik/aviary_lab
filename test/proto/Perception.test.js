import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns correct categories based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const expected = { low: [2, 3, 4, 5], high: [4, 5] };
  assert.deepEqual(perception.classify(inputs, thresholds), expected);
});

test('classify throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 2 };
  assert.deepEqual(perception.classify([], thresholds), {});
});

test('classify handles edge case of negative thresholds', () => {
  const inputs = [1, 2, 3];
  const thresholds = { negative: -1 };
  const expected = { negative: [1, 2, 3] };
  assert.deepEqual(perception.classify(inputs, thresholds), expected);
});

test('checkInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.checkInputs(null), TypeError);
});

test('checkInputs throws TypeError for invalid input values', () => {
  assert.throws(() => perception.checkInputs([1, null, 3]), TypeError);
  assert.throws(() => perception.checkInputs([1, Infinity, 3]), TypeError);
});