import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

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

