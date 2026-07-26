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
  const categories = { low: 2, high: 4 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 'invalid', high: 4 };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify works with varying thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { ten: 10, twenty: 20, thirty: 30 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { ten: [10, 20, 30, 40], twenty: [20, 30, 40], thirty: [30, 40] });
});
