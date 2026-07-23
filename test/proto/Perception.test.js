import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly classifies inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('classify with empty inputs', () => {
  const inputs = [];
  const categories = { low: 2, medium: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize with empty inputs', () => {
  const inputs = [];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize includes empty categories if specified', () => {
  const inputs = [];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [] });
});

