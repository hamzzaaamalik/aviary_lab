import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns correct classifications', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify handles empty inputs', () => {
  assert.throws(() => perception.classify([], { category: 1 }), TypeError);
});

test('classify handles invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify handles thresholds below inputs', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 0, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3], high: [] });
});

test('classify handles invalid thresholds', () => {
  const inputs = [1, 2];
  assert.throws(() => perception.classify(inputs, { invalid: 'a' }), TypeError);
});
