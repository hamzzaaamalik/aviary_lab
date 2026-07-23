import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method identifies noise above threshold', () => {
  const inputs = [1, 2, 3, 4, 5, 0];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect method throws error for invalid inputs', () => {
  assert.throws(() => perception.detect('invalid', 3), TypeError);
  assert.throws(() => perception.detect([1, 2, 3], 'not-a-number'), TypeError);
});

test('filter method applies predicate correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4, 5]);
});

test('filter method throws error for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not-a-function'), TypeError);
});

