import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('categorize method categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4, high: 6 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    medium: [4, 5],
    high: []
  });
});

test('categorize method handles empty input', () => {
  const inputs = [];
  const categories = { low: 2, medium: 4, high: 6 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [],
    medium: [],
    high: []
  });
});

test('categorize method handles empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = {};
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize method includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [2, 3],
    medium: [],
  });
});

// Additional tests...

