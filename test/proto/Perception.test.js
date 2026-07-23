import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorize method categorizes inputs correctly', () => {
  const perception = new Perception();
  const sensoryInputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(sensoryInputs, categories);
  assert.deepEqual(result, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5]
  });
});

test('categorize method includes empty categories when specified', () => {
  const perception = new Perception();
  const sensoryInputs = [1, 2];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(sensoryInputs, categories, true);
  assert.deepEqual(result, {
    low: [1, 2],
    medium: [],
    high: []
  });
});

test('categorize method throws on invalid categories', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorize([1, 2], 'invalid'), TypeError);
  assert.throws(() => perception.categorize([1, 2], { low: 'invalid' }), TypeError);
});

