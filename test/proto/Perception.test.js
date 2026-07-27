import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('advancedFilter throws on non-array predicates', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not-a-function'), TypeError);
});

test('advancedFilter filters with multiple predicates', () => {
  const predicates = [x => x > 1, x => x < 5];
  const result = perception.advancedFilter([0, 1, 2, 3, 4, 5], predicates);
  assert.deepEqual(result, [2, 3, 4]);
});

test('advancedFilter returns empty array when no inputs match', () => {
  const predicates = [x => x > 10];
  const result = perception.advancedFilter([1, 2, 3], predicates);
  assert.deepEqual(result, []);
});

test('advancedFilter handles non-finite numbers', () => {
  assert.throws(() => perception.advancedFilter([NaN, Infinity, 2], [x => Number.isFinite(x)]), TypeError);
});

