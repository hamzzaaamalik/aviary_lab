import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('advancedFilter applies all predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [
    (x) => x > 1,
    (x) => x < 5
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [2, 3, 4]);
});

test('advancedFilter throws on invalid predicates', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not a function'), TypeError);
  assert.throws(() => perception.advancedFilter([1, 2, 3], [() => {}, 'not a function']), TypeError);
});

test('advancedFilter returns empty array for no matching inputs', () => {
  const inputs = [1, 2, 3];
  const predicates = [x => x > 5];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, []);
});

