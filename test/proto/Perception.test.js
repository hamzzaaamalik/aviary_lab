import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize returns correct categories with empty check', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { low: 2, high: 3 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { low: 5, high: 3 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], high: [3, 4] });
});

test('categorize excludes empty categories by default', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { low: 5, high: 3 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { high: [3, 4] });
});

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
  assert.throws(() => perception.categorize([], { invalid: 'string' }), TypeError);
});
