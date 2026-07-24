import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize classifies inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 2 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [2, 3] });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
  assert.throws(() => perception.categorize([1, 2], { high: 'invalid' }), TypeError);
});

