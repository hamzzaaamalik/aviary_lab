import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5] });
});

test('categorize excludes empty categories when requested', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, medium: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, medium: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [2, 3], medium: [] });
});

test('categorize throws on invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
  assert.throws(() => perception.categorize([1, 2], 'string'), TypeError);
});
