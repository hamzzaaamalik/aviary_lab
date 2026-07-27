import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs based on thresholds', () => {
  const inputs = [1, 5, 10, 15, 20];
  const categories = {
    low: 5,
    medium: 10,
    high: 15
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15, 20],
    medium: [10, 15, 20],
    high: [15, 20]
  });
});

test('classify throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.classify('invalid', {}), TypeError);
  assert.throws(() => perception.classify([], 'not an object'), TypeError);
  assert.throws(() => perception.classify([], { invalid: 'not a number' }), TypeError);
});

// Existing tests for detect and filter

test('detect identifies noise based on threshold', () => {
  const inputs = [1, 5, 10, 15, 20];
  const threshold = 10;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [10, 15, 20]);
});

test('filter applies predicate correctly', () => {
  const inputs = [1, 5, 10, 15, 20];
  const result = perception.filter(inputs, input => input > 10);
  assert.deepEqual(result, [15, 20]);
});
