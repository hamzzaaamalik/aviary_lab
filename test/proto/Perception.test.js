import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilter filters inputs based on multiple predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [
    (x) => x > 1,
    (x) => x < 5
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [2, 3, 4]);
});

test('advancedFilter throws for non-array predicates', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not an array'), TypeError);
});

test('advancedFilter throws for predicates containing non-function items', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], [() => true, 'not a function']), TypeError);
});

test('advancedFilter returns empty array for empty input', () => {
  const result = perception.advancedFilter([], [() => true]);
  assert.deepEqual(result, []);
});

