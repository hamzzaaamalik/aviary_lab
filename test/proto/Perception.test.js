import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('categorize groups sensory inputs by categories', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 10, medium: 30, high: 40 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [10, 20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50]
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [10, 20, 30];
  const categories = { low: 10, medium: 50, high: 40 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [10, 20, 30],
    medium: [],
    high: []
  });
});

test('categorize throws on invalid categories', () => {
  assert.throws(() => perception.categorize([10, 20], 'invalid'), TypeError);
  assert.throws(() => perception.categorize([10, 20], { low: 'not a number' }), TypeError);
});

