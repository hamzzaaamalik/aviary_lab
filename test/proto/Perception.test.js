import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], medium: [3, 4, 5], high: [5] });
});

test('categorize with empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 1, medium: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3] });
});

test('categorize with includeEmpty flag', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 1, medium: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [1, 2, 3], medium: [] });
});

// Edge case tests

test('categorize with no inputs', () => {
  const inputs = [];
  const categories = { low: 1, medium: 3 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize with invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
  assert.throws(() => perception.categorize([1, 2], { low: 'not a number' }), TypeError);
});
