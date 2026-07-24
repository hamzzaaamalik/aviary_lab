import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect with valid inputs', () => {
  const result = perception.detect([1, 2, 3, 4], 2);
  assert.deepEqual(result, [2, 3, 4]);
});

test('detect with empty input array', () => {
  const result = perception.detect([], 2);
  assert.deepEqual(result, []);
});

test('detect with non-numeric inputs', () => {
  assert.throws(() => perception.detect([1, 'a', 3], 2), TypeError);
});

test('filter with valid inputs', () => {
  const result = perception.filter([1, 2, 3, 4], x => x > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filter with empty input array', () => {
  const result = perception.filter([], x => x > 2);
  assert.deepEqual(result, []);
});

test('filter with non-function predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not-a-function'), TypeError);
});

test('classify with valid inputs', () => {
  const result = perception.classify([1, 2, 3, 4], { high: 3, low: 1 });
  assert.deepEqual(result, { high: [3, 4], low: [1, 2, 3, 4] });
});

test('classify with empty input array', () => {
  const result = perception.classify([], { high: 3, low: 1 });
  assert.deepEqual(result, { high: [], low: [] });
});

test('classify with non-numeric thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { high: 'three' }), TypeError);
});
