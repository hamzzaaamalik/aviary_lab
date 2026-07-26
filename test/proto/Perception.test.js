import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by category thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    high: [4, 5]
  });
});

test('classify throws for empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws for invalid thresholds', () => {
  const categories = { low: 'a' };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

test('classify works with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    high: [4, 5]
  });
});
