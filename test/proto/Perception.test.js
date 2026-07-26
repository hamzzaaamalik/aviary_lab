import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by category thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const expected = {
    low: [2, 3, 4, 5],
    high: [4, 5],
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'not-a-number' }), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});
