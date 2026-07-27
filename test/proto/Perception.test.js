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
  const filtered = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(filtered, [2, 3, 4]);
});

test('advancedFilter throws on invalid predicates', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not a function'), TypeError);
  assert.throws(() => perception.advancedFilter([1, 2, 3], [() => {}, 'not a function']), TypeError);
});

// Add tests for detect and filter methods as necessary.