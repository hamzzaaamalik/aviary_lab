import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4, high: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5], high: [5] });
});

test('classify excludes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 4, medium: 5 };
  assert.throws(() => perception.classify(inputs, categories), Error);
});

test('classify includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 4, medium: 5 };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [] });
});

test('classify throws error on invalid inputs', () => {
  assert.throws(() => perception.classify(null, {}), TypeError);
  assert.throws(() => perception.classify([], null), TypeError);
});

test('classify throws error on non-numeric inputs', () => {
  assert.throws(() => perception.classify([1, 'a', 3], { low: 2 }), TypeError);
});
