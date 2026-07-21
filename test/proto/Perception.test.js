import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x > 2;
  const result = perception.detect(inputs, predicate);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect throws on invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', () => true), TypeError);
  assert.throws(() => perception.detect([], 'not a function'), TypeError);
});

test('filter returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (x) => x % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws on invalid inputs', () => {
  assert.throws(() => perception.filter('not an array', () => true), TypeError);
  assert.throws(() => perception.filter([], 'not a function'), TypeError);
});
