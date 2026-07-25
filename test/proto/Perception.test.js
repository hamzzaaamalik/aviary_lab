import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 20, high: 40 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [20, 30, 40, 50], high: [40, 50] });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 20 }), TypeError);
  assert.throws(() => perception.classify([10, 20], null), TypeError);
  assert.throws(() => perception.classify([10, 20], {}), TypeError);
  assert.throws(() => perception.classify([10, 20], { low: 'not-a-number' }), TypeError);
});

test('classify handles edge cases with thresholds', () => {
  const inputs = [0, 1, 2, 3, 4];
  const categories = { zero: 0, one: 1, two: 2, three: 3, four: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { zero: [0, 1, 2, 3, 4], one: [1, 2, 3, 4], two: [2, 3, 4], three: [3, 4], four: [4] });
});

test('detect returns noise based on threshold', () => {
  const inputs = [5, 15, 25, 35];
  const result = perception.detect(inputs, 20);
  assert.deepEqual(result, [25, 35]);
});

test('filter returns inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, x => x > 3);
  assert.deepEqual(result, [4, 5]);
});
