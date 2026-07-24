import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize filters inputs into categories', () => {
  const inputs = [5, 10, 15, 20];
  const categories = { low: 10, medium: 15, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [10, 15, 20],
    medium: [15, 20],
    high: [5, 10, 15, 20]
  });
});

test('categorize includes empty categories when requested', () => {
  const inputs = [5, 10, 15, 20];
  const categories = { low: 30, medium: 15, high: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [],
    medium: [15, 20],
    high: [5, 10, 15, 20]
  });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
  assert.throws(() => perception.categorize([], { low: 'not a number' }), TypeError);
});
