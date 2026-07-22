import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detect(inputs, x => x > 2);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect throws on invalid input', () => {
  assert.throws(() => perception.detect('not an array', x => x > 2), TypeError);
});

test('detect throws on non-function predicate', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'not a function'), TypeError);
});

test('filter filters inputs based on criteria', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, x => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws on invalid input', () => {
  assert.throws(() => perception.filter('not an array', x => x % 2 === 0), TypeError);
});

test('filter throws on non-function criteria', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

