import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns detected inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [4, 5]);
});

test('detect throws TypeError for invalid threshold', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'string'), TypeError);
});

test('filter returns filtered inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (num) => num % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not-a-function'), TypeError);
});

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not-an-object'), TypeError);
});

test('normalize returns normalized inputs between 0 and 1', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.normalize(inputs);
  assert.deepEqual(result, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize handles edge case of identical values', () => {
  const inputs = [3, 3, 3];
  const result = perception.normalize(inputs);
  assert.deepEqual(result, [0, 0, 0]);
});

test('checkInputs throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.checkInputs('not-an-array'), TypeError);
  assert.throws(() => perception.checkInputs([1, 2, 'not-a-number']), TypeError);
});

test('validateThresholds throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.validateThresholds({ valid: 1, invalid: 'string' }), TypeError);
});

