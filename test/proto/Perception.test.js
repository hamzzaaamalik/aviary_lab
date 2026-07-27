import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect throws TypeError for invalid input', () => {
  assert.throws(() => perception.detect('invalid', 3), TypeError);
});

test('filter applies predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

test('advancedFilter applies multiple predicates', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicates = [x => x > 1, x => x < 5];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [2, 3, 4]);
});

test('advancedFilter throws TypeError for invalid predicates', () => {
  assert.throws(() => perception.advancedFilter([1, 2, 3], 'not an array'), TypeError);
});
