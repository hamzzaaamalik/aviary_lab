import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15],
  });
});

test('classify throws for non-object categories', () => {
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
});

test('categorize correctly categorizes inputs', () => {
  const inputs = [1, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15],
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2];
  const categories = { low: 1, medium: 3 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [1, 2],
    medium: [],
  });
});

test('categorize throws for non-object categories', () => {
  assert.throws(() => perception.categorize([1, 2], 'not an object'), TypeError);
});

test('detect works with valid inputs', () => {
  const inputs = [1, 2, 3, 4];
  const threshold = 2;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [2, 3, 4]);
});

test('filter works with valid inputs', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = (input) => input > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4]);
});
