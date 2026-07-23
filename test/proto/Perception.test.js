import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect: returns inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detect(inputs, 3);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect: throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', 3), TypeError);
  assert.throws(() => perception.detect([1, 2, 3], 'not a number'), TypeError);
});

test('filter: returns filtered inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, n => n % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter: throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

test('classify: classifies inputs into categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify: throws TypeError for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
});
