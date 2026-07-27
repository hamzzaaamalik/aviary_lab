// test/proto/Perception.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly classifies inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty sensory inputs', () => {
  const categories = { low: 2, high: 4 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
});

test('classify handles thresholds correctly', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { categoryA: 1, categoryB: 3 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { categoryA: [1, 2, 3, 4], categoryB: [3, 4] });
});
