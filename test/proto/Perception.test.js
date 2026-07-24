import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize method categorizes inputs correctly', () => {
  const inputs = [1, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15]
  });
});

test('categorize method handles empty input', () => {
  const inputs = [];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize method includes empty categories when specified', () => {
  const inputs = [];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [],
    medium: [],
    high: []
  });
});
