import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method filters inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect method throws on invalid input', () => {
  assert.throws(() => perception.detect('not an array', 3), TypeError);
  assert.throws(() => perception.detect([1, 2, 3], 'not a number'), TypeError);
});

test('filter method filters inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (input) => input % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws on invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

test('classify method classifies inputs into categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify method throws on invalid category input', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
});
