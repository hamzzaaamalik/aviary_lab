import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('detect returns empty array for no inputs', () => {
  const result = perception.detect([], 5);
  assert.deepEqual(result, []);
});

test('detect filters out below threshold', () => {
  const result = perception.detect([3, 6, 2], 4);
  assert.deepEqual(result, [6]);
});

// New edge case tests

test('detect throws TypeError for null inputs', () => {
  assert.throws(() => perception.detect(null, 5), TypeError);
});


test('filter throws TypeError for non-function predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});


test('classify throws TypeError for null categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
});


test('classify throws TypeError for non-object categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
});


test('classify returns classified inputs', () => {
  const result = perception.classify([1, 2, 3, 4], { high: 3 });
  assert.deepEqual(result, { high: [3, 4] });
});


test('categorize throws TypeError for non-object categories', () => {
  assert.throws(() => perception.categorize([1, 2, 3], 'not an object'), TypeError);
});

