import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilter filters inputs based on multiple predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [
    (x) => x > 2,
    (x) => x < 5
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [3, 4]);
});

test('advancedFilter throws on invalid predicates', () => {
  const invalidPredicates = 'not an array';
  assert.throws(() => perception.advancedFilter([1, 2, 3], invalidPredicates), TypeError);
});

test('advancedFilter handles empty input', () => {
  const result = perception.advancedFilter([], [(x) => x > 0]);
  assert.deepEqual(result, []);
});

test('advancedFilter returns all inputs if no predicates match', () => {
  const inputs = [1, 2, 3];
  const predicates = [
    (x) => x > 5,
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, []);
});
