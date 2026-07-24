import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize with empty inputs', () => {
  const inputs = [];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [], medium: [] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 1, 1];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [] });
});

test('categorize throws on invalid input', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
});

