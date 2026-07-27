// test/proto/Perception.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [4, 5]);
});

test('filter method works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = x => x % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('classify method works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect(null, 2), TypeError);
  assert.throws(() => perception.detect([1, 2, 3], '2'), TypeError);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], null), TypeError);
});

test('classify throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
});
