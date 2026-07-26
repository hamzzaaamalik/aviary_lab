import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    high: [4, 5]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError, 'Categories must be an object.');
  assert.throws(() => perception.classify([1, 2], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: 'string' }), TypeError, 'Threshold for low must be a finite number.');
});

