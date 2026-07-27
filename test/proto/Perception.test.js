import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize returns an array of normalized inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize handles empty array', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize handles single value array', () => {
  const result = perception.normalize([4]);
  assert.deepEqual(result, [0]); // single value should normalize to 0
});

test('normalize handles identical values', () => {
  const result = perception.normalize([2, 2, 2]);
  assert.deepEqual(result, [0, 0, 0]); // identical values should normalize to 0
});

test('normalize throws on invalid input', () => {
  assert.throws(() => perception.normalize([1, 'two', 3]), TypeError);
  assert.throws(() => perception.normalize(null), TypeError);
});

test('detect throws on non-array input', () => {
  assert.throws(() => perception.detect('not an array', 0), TypeError);
});

test('filter throws on non-function predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});
