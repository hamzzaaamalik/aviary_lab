import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize returns categorized inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 2 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [2, 3] });
});

test('categorize handles empty input array', () => {
  const inputs = [];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [], medium: [] });
});

test('categorize throws error for invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], 'not-an-object'), TypeError);
});

test('categorize throws error for invalid thresholds', () => {
  const categories = { low: 'not-a-number' };
  assert.throws(() => perception.categorize([1, 2], categories), TypeError);
});

