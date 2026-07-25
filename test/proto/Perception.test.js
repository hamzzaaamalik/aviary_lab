import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1], 'not an object'), TypeError);
  assert.throws(() => perception.classify([1], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 'not a number' };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify works with valid categories', () => {
  const inputs = [5, 10, 15];
  const categories = { low: 5, medium: 10 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [5, 10, 15], medium: [10, 15] });
});

