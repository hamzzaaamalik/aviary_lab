import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles valid inputs correctly', () => {
  const thresholds = { high: 10, medium: 5 };
  const inputs = [1, 5, 10, 15];
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { high: [10, 15], medium: [5, 10, 15] });
});

test('classify returns empty object for empty inputs', () => {
  const thresholds = { high: 10 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { invalid: 'not a number' }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { }), TypeError);
});

test('classify validates input types properly', () => {
  const thresholds = { low: 0 };
  assert.throws(() => perception.classify([1, null, undefined], thresholds), TypeError);
  assert.throws(() => perception.classify('not an array', thresholds), TypeError);
});

test('classify checks for finite numbers', () => {
  const thresholds = { positive: 0 };
  assert.throws(() => perception.classify([Infinity, -Infinity, NaN], thresholds), TypeError);
});
