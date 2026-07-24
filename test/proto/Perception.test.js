import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize method categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], medium: [3, 4, 5], high: [5] });
});

test('categorize method handles empty input', () => {
  const inputs = [];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [], medium: [], high: [] });
});

test('categorize method includes empty categories when specified', () => {
  const inputs = [];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [], high: [] });
});

