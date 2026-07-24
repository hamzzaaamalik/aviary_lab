import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('categorize groups inputs according to categories', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 20, high: 40 };
  const expected = { low: [20, 30, 40, 50], high: [40, 50] };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, expected);
});

test('categorize handles empty categories correctly', () => {
  const inputs = [5, 10, 15];
  const categories = { low: 20, mid: 10 };
  const expected = { mid: [10, 15] };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, expected);
});

test('categorize includes empty categories when specified', () => {
  const inputs = [5, 10, 15];
  const categories = { low: 20, mid: 10 };
  const expected = { low: [], mid: [10, 15] };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, expected);
});

