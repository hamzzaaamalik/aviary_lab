import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2];
  const categories = { low: 3, high: 4 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], high: [] });
});

test('categorize throws on invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
  assert.throws(() => perception.categorize([1, 2], 'not an object'), TypeError);
});

test('categorize throws on invalid thresholds', () => {
  const inputs = [1, 2];
  const categories = { low: 3, invalid: 'not a number' };
  assert.throws(() => perception.categorize(inputs, categories), TypeError);
});

