import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize method returns categorized inputs', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { noise: 20, signal: 30 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { noise: [20, 30, 40], signal: [30, 40] });
});

test('categorize method includes empty categories when specified', () => {
  const inputs = [10, 15];
  const categories = { noise: 20, signal: 30 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { noise: [], signal: [] });
});

test('categorize method throws on invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
  assert.throws(() => perception.categorize([], { valid: 'not a number' }), TypeError);
});

test('categorize method handles empty input correctly', () => {
  const inputs = [];
  const categories = { noise: 20, signal: 30 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});
