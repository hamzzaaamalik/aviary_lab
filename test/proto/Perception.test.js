import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const expected = {
    low: [2, 3, 4, 5],
    high: [4, 5]
  };
  assert.deepEqual(perception.classify(inputs, categories), expected);
});

test('classify throws error for empty sensory inputs', () => {
  const categories = { low: 1 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws error for invalid categories object', () => {
  const inputs = [1, 2];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify throws error for invalid thresholds', () => {
  const inputs = [1, 2];
  const categories = { low: 'a' };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

