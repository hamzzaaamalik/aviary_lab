import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize throws on non-object categories', () => {
  assert.throws(() => perception.categorize([], null), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
});

test('categorize throws on non-numeric thresholds', () => {
  const categories = { high: 'not a number' };
  assert.throws(() => perception.categorize([1, 2, 3], categories), TypeError);
});

// Additional tests for categorize

// Test case for valid categories
test('categorize returns correct categories', () => {
  const categories = { high: 2, medium: 1 };
  const result = perception.categorize([1, 2, 3], categories);
  assert.deepEqual(result, { high: [2, 3], medium: [1, 2, 3] });
});

// Test case for including empty categories
test('categorize includes empty categories when specified', () => {
  const categories = { high: 2, low: 0 };
  const result = perception.categorize([1, 2, 3], categories, true);
  assert.deepEqual(result, { high: [2, 3], low: [1, 2, 3] });
});

// Test case for excluding empty categories
test('categorize excludes empty categories by default', () => {
  const categories = { high: 5, low: 0 };
  const result = perception.categorize([1, 2, 3], categories);
  assert.deepEqual(result, { low: [1, 2, 3] });
});
