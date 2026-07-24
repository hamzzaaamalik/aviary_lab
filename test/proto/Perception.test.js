import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize handles empty input', () => {
  const categories = { high: 5, low: 2 };
  const result = perception.categorize([], categories);
  assert.deepEqual(result, {});
});

test('categorize includes empty categories when specified', () => {
  const categories = { high: 5, low: 2 };
  const result = perception.categorize([], categories, true);
  assert.deepEqual(result, { high: [], low: [] });
});

test('categorize classifies inputs correctly', () => {
  const inputs = [1, 2, 3, 6, 7];
  const categories = { high: 5, low: 3 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { high: [6, 7], low: [3, 6, 7] });
});

test('categorize throws on invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], 'invalid'), TypeError);
});

test('categorize throws on non-numeric thresholds', () => {
  const categories = { high: 'five' };
  assert.throws(() => perception.categorize([1, 2], categories), TypeError);
});