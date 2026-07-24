import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles edge cases', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    medium: 4,
    high: 6
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    medium: [4, 5],
    high: []
  });
});

test('classify throws error for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
});

test('classify throws error for non-numeric thresholds', () => {
  const categories = {
    category1: 'not a number',
    category2: 2
  };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

// Existing tests for detect and filter methods

test('detect identifies noise above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('filter applies predicate correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = x => x % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});
