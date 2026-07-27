import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests
// ... existing tests ...

test('advancedFilter filters inputs based on multiple predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [
    (x) => x > 1,
    (x) => x < 5
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [2, 3, 4]);
});

test('advancedFilter throws TypeError for invalid predicates', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.advancedFilter(inputs, 'not an array'), TypeError);
  assert.throws(() => perception.advancedFilter(inputs, [() => {}, 'not a function']), TypeError);
});

test('advancedFilter works with an empty input array', () => {
  const result = perception.advancedFilter([], [(x) => x > 1]);
  assert.deepEqual(result, []);
});
