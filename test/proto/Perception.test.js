import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilter filters sensory inputs based on multiple predicates', () => {
  const inputs = [1, 2, 3, 4, 5, 6];
  const predicates = [
    input => input > 2,
    input => input < 6
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [3, 4, 5]);
});

test('advancedFilter throws on invalid predicates', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not a function'), TypeError);
  assert.throws(() => perception.advancedFilter([1, 2, 3], [null]), TypeError);
});

test('advancedFilter returns empty array on empty input', () => {
  const result = perception.advancedFilter([], [input => input > 0]);
  assert.deepEqual(result, []);
});

