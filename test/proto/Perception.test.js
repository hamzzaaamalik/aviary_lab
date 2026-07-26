import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify method classifies inputs correctly', () => {
  const inputs = [10, 20, 30, 40];
  const categories = {
    low: 15,
    medium: 25,
    high: 35
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify throws on invalid inputs', () => {
  const categories = {
    low: 15
  };
  assert.throws(() => perception.classify([], categories), TypeError);
  assert.throws(() => perception.classify([10, 20], null), TypeError);
});

test('classify throws on invalid categories', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'string' }), TypeError);
});
