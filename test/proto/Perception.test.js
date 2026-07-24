import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups inputs into categories with thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize includes empty categories when requested', () => {
  const inputs = [1, 1.5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [] });
});

// Error handling tests

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', { low: 2 }), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
});

test('categorize throws TypeError for invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2, 3], 'not an object'), TypeError);
  assert.throws(() => perception.categorize([1, 2, 3], { low: 'not a number' }), TypeError);
});
