import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize with dynamic thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const categories = {
    low: () => 15,
    medium: () => 25,
    high: () => 35,
  };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40],
  });
});

test('categorize throws on empty inputs', () => {
  assert.throws(() => perception.categorize([], { low: () => 0 }), TypeError);
});

test('categorize throws on invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], 'not an object'), TypeError);
  assert.throws(() => perception.categorize([1, 2], { low: 'not a function' }), TypeError);
});

