import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 10, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [10, 20, 30, 40],
    medium: [30, 40],
    high: [40],
  });
});

test('classify handles empty inputs gracefully', () => {
  const inputs = [];
  const categories = { low: 10, medium: 25 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {});
});

test('classify throws on invalid categories', () => {
  const inputs = [10, 20];
  assert.throws(() => perception.classify(inputs, 'not-an-object'), TypeError);
});

test('classify includes empty categories when requested', () => {
  const inputs = [10, 20];
  const categories = { low: 10, medium: 25 };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, {
    low: [10, 20],
    medium: [],
  });
});

