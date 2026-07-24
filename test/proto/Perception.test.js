import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize returns categorized inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 2 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { medium: [2, 3], low: [] });
});

test('categorize throws TypeError for invalid categories', () => {
  assert.throws(() => perception.categorize([1], 'invalid'), TypeError);
});

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize('invalid', {}), TypeError);
});

test('categorize handles empty inputs gracefully', () => {
  const result = perception.categorize([], { low: 2, high: 4 });
  assert.deepEqual(result, {});
});
