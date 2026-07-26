import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateInputs should throw on non-array input', () => {
  assert.throws(() => perception.validateInputs('not an array'), TypeError);
});

test('validateInputs should throw on array with non-finite numbers', () => {
  assert.throws(() => perception.validateInputs([1, 2, NaN]), TypeError);
});

test('validateInputs should not throw on valid input', () => {
  perception.validateInputs([1, 2, 3]); // should not throw
});


test('validateThresholds should throw on empty object', () => {
  assert.throws(() => perception.validateThresholds({}), TypeError);
});


test('validateThresholds should throw on invalid threshold', () => {
  assert.throws(() => perception.validateThresholds({ high: 'not a number' }), TypeError);
});


test('validateThresholds should not throw on valid thresholds', () => {
  perception.validateThresholds({ low: 1, high: 5 }); // should not throw
});


test('detect should find inputs above threshold', () => {
  const result = perception.detect([1, 2, 3, 4, 5], 3);
  assert.deepEqual(result, [3, 4, 5]);
});


test('detect throws on invalid input', () => {
  assert.throws(() => perception.detect('not an array', 3), TypeError);
});


test('detect returns empty array if no inputs above threshold', () => {
  const result = perception.detect([1, 2], 5);
  assert.deepEqual(result, []);
});


test('filter should return inputs matching predicate', () => {
  const result = perception.filter([1, 2, 3, 4, 5], x => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});


test('filter throws on invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});


test('filter returns empty array if no matches', () => {
  const result = perception.filter([1, 3, 5], x => x % 2 === 0);
  assert.deepEqual(result, []);
});
