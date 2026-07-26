import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    medium: 4,
    high: 6
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    medium: [4, 5],
    high: []
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: 'not-a-number' }), TypeError);
});
