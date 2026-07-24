import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize method with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, mid: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], mid: [3, 4, 5], high: [5] });
});

test('categorize method excludes empty categories', () => {
  const inputs = [1, 2];
  const categories = { low: 1, mid: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2] });
});

test('categorize method includes empty categories when specified', () => {
  const inputs = [1, 2];
  const categories = { low: 1, mid: 3, high: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [1, 2], mid: [], high: [] });
});

test('categorize method throws on invalid input', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
});
