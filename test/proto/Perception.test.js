import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters inputs above the threshold', () => {
  const inputs = [1, 3, 5, 7, 9];
  const threshold = 5;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [5, 7, 9]);
});

test('detect throws on invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', 5), TypeError);
  assert.throws(() => perception.detect([1, 2, 3], 'not a number'), TypeError);
});

test('filter filters inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = x => x % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws on invalid inputs', () => {
  assert.throws(() => perception.filter('not an array', x => x), TypeError);
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});
