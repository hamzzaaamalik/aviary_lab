import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize categorizes inputs correctly', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40],
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [5, 10];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [],
    medium: [],
    high: [],
  });
});

test('categorize throws error for invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
});

test('categorize handles empty input gracefully', () => {
  const inputs = [];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [],
    medium: [],
    high: [],
  });
});

