import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Tests for detect method

test('detect returns noise inputs above threshold', () => {
  const result = perception.detect([1, 2, 3, 4, 5], 3);
  assert.deepEqual(result, [3, 4, 5]);
});


test('detect returns empty array for below threshold', () => {
  const result = perception.detect([1, 2, 3], 4);
  assert.deepEqual(result, []);
});


test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('invalid', 1), TypeError);
  assert.throws(() => perception.detect([1, 2], 'invalid'), TypeError);
});

// Tests for filter method

test('filter returns filtered sensory inputs', () => {
  const result = perception.filter([1, 2, 3, 4], x => x > 2);
  assert.deepEqual(result, [3, 4]);
});


test('filter returns empty array when no elements match', () => {
  const result = perception.filter([1, 2, 3], x => x > 3);
  assert.deepEqual(result, []);
});


test('filter throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.filter('invalid', x => x > 1), TypeError);
  assert.throws(() => perception.filter([1, 2], 'invalid'), TypeError);
});


test('filter handles empty array', () => {
  const result = perception.filter([], x => x > 1);
  assert.deepEqual(result, []);
});
