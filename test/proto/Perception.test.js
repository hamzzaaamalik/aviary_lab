import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with empty inputs returns empty object', () => {
  const result = perception.classify([], { category1: 10, category2: 20 });
  assert.deepEqual(result, {});
});

test('classify with valid inputs', () => {
  const result = perception.classify([5, 10, 15, 20], { low: 10, high: 15 });
  assert.deepEqual(result, { low: [10, 15, 20], high: [15, 20] });
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'invalid'), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify('invalid', { category: 10 }), TypeError);
});
