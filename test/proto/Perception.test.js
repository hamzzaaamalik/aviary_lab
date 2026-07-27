import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilter returns inputs matching all predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [x => x > 2, x => x < 5];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [3, 4]);
});

test('advancedFilter throws when predicates is not an array', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not an array'), TypeError);
});

test('advancedFilter throws when predicates contains non-function', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], [() => {}, 'not a function']), TypeError);
});

test('advancedFilter returns empty array when inputs are empty', () => {
  const result = perception.advancedFilter([], [x => x > 0]);
  assert.deepEqual(result, []);
});

test('advancedFilter returns empty array when no inputs match predicates', () => {
  const inputs = [1, 2, 3];
  const predicates = [x => x > 3];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, []);
});
