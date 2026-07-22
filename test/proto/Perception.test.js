import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method returns detected sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x > 2;
  const result = perception.detect(inputs, predicate);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect method throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'not a function'), TypeError);
});

test('filter method returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (x) => x % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws TypeError for invalid criteria', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});
