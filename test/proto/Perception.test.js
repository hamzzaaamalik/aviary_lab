import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize method classifies inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('categorize method handles empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3] });
});

test('categorize method includes empty categories when requested', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 2, high: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [2, 3], high: [] });
});

test('categorize method throws on invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], 'invalid'), TypeError);
});

test('categorize method throws on invalid threshold', () => {
  const categories = { low: 2, high: 'invalid' };
  assert.throws(() => perception.categorize([1, 2], categories), TypeError);
});
