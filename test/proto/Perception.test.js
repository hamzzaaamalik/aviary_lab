import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups inputs by categories with thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], medium: [3, 4, 5], high: [5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 0, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [1, 2, 3], medium: [3], high: [] });
});

test('categorize throws TypeError for invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.categorize(inputs, null), TypeError);
  assert.throws(() => perception.categorize(inputs, { low: 'a' }), TypeError);
});

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize('invalid', { low: 1 }), TypeError);
});
