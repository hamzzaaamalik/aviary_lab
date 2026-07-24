import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize method categorizes inputs correctly', () => {
  const inputs = [0, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15]
  });
});

test('categorize method includes empty categories when specified', () => {
  const inputs = [0, 1, 2];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [],
    medium: [],
    high: []
  });
});

test('categorize method throws on invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
});

test('categorize method throws on invalid threshold', () => {
  const inputs = [5, 10];
  const categories = { low: 'five', medium: 10 };
  assert.throws(() => perception.categorize(inputs, categories), TypeError);
});
