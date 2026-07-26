import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 2 }), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'not a number' }), TypeError);
});

// Additional tests for the existing methods to ensure everything is still functional

test('detect works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('filter works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, input => input % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});
