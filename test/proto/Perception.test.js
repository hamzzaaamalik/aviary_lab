import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize transforms inputs to range [0, 1]', () => {
  const inputs = [10, 20, 30, 40, 50];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize handles edge case where all values are the same', () => {
  const inputs = [5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

test('normalize throws on invalid inputs', () => {
  assert.throws(() => perception.normalize([1, 2, NaN]), TypeError);
  assert.throws(() => perception.normalize('not an array'), TypeError);
});

// Existing tests for detect and filter...

// Test for filter method
test('filter applies the predicate function correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x > 3;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [4, 5]);
});

test('filter throws on invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

// Test for detect method
test('detect identifies inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detect(inputs, 3);
  assert.deepEqual(result, [4, 5]);
});

test('detect throws on invalid inputs', () => {
  assert.throws(() => perception.detect([1, 2, NaN], 2), TypeError);
  assert.throws(() => perception.detect('not an array', 2), TypeError);
});
