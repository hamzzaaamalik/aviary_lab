import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], medium: [3, 4, 5], high: [4, 5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2];
  const categories = { low: 1, medium: 3, high: 4 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [1, 2], medium: [], high: [] });
});

test('categorize throws error on invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
});

