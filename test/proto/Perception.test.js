import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns detected noise inputs', () => {
  const result = perception.detect([1, 2, 3, 4], 2);
  assert.deepEqual(result, [2, 3, 4]);
});

test('detect returns empty array for no noise', () => {
  const result = perception.detect([1, 1, 1], 2);
  assert.deepEqual(result, []);
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', 2), TypeError);
});

test('filter returns filtered inputs', () => {
  const result = perception.filter([1, 2, 3, 4], n => n > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filter returns empty array for no matches', () => {
  const result = perception.filter([1, 1, 1], n => n > 2);
  assert.deepEqual(result, []);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

test('classify returns classified inputs', () => {
  const categories = { low: 2, high: 4 };
  const result = perception.classify([1, 2, 3, 4], categories);
  assert.deepEqual(result, { low: [2, 3, 4], high: [4] });
});

test('classify throws TypeError for empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 2 }), TypeError);
});

test('classify throws TypeError for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
});

test('classify handles edge case for no categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});
