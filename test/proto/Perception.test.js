import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    high: 4
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    high: [4, 5]
  });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'low' }), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify correctly handles edge case with all inputs below thresholds', () => {
  const inputs = [1, 1.5, 1.9];
  const categories = {
    low: 2,
    high: 4
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [],
    high: []
  });
});

test('classify correctly handles edge case with all inputs above thresholds', () => {
  const inputs = [5, 6, 7];
  const categories = {
    low: 2,
    high: 4
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 6, 7],
    high: [5, 6, 7]
  });
});
