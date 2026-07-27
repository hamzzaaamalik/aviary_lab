import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilter returns inputs matching all predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [
    (x) => x > 1,
    (x) => x < 5
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [2, 3, 4]);
});

test('advancedFilter returns empty array when no inputs match', () => {
  const inputs = [1, 2, 3];
  const predicates = [
    (x) => x > 3,
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, []);
});

test('advancedFilter throws TypeError for invalid predicates', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.advancedFilter(inputs, 'not-an-array'), TypeError);
  assert.throws(() => perception.advancedFilter(inputs, [null]), TypeError);
});

test('advancedFilter handles empty input array', () => {
  const inputs = [];
  const predicates = [
    (x) => x > 1,
  ];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, []);
});