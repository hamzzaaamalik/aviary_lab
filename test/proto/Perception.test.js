import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize inputs according to categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4, high: 6 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize with empty categories excluded', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, medium: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3] });
});

test('categorize with empty categories included', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, medium: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [2, 3], medium: [] });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize('invalid', {}), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
});
