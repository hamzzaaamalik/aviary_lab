import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const sensoryInputs = [5, 10, 15, 20];
  const thresholdsMap = { low: 0, medium: 10, high: 15 };
  const result = perception.classify(sensoryInputs, thresholdsMap);
  assert.deepEqual(result, {
    low: [5, 10, 15, 20],
    medium: [10, 15, 20],
    high: [15, 20]
  });
});

test('classify throws on invalid thresholds', () => {
  const sensoryInputs = [5, 10];
  const thresholdsMapInvalid = { low: 0, medium: NaN, high: 15 };
  assert.throws(() => perception.classify(sensoryInputs, thresholdsMapInvalid), TypeError);
});

test('classify throws on empty sensory inputs', () => {
  const thresholdsMap = { low: 0, medium: 10, high: 15 };
  assert.throws(() => perception.classify([], thresholdsMap), TypeError);
});

test('classify throws on invalid thresholdsMap type', () => {
  const sensoryInputs = [5, 10];
  assert.throws(() => perception.classify(sensoryInputs, 'not an object'), TypeError);
});

test('checkInputs throws on non-array inputs', () => {
  assert.throws(() => perception.checkInputs('not an array'), TypeError);
});

test('checkInputs throws on empty inputs', () => {
  assert.throws(() => perception.checkInputs([]), TypeError);
});

test('checkInputs throws on invalid input values', () => {
  assert.throws(() => perception.checkInputs([1, 2, null]), TypeError);
  assert.throws(() => perception.checkInputs([1, 2, undefined]), TypeError);
  assert.throws(() => perception.checkInputs([1, 2, 'string']), TypeError);
});
