import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs into categories', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 5 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([10], null), TypeError, 'Categories must be an object.');
  assert.throws(() => perception.classify([10], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on non-finite thresholds', () => {
  const categories = { valid: 10, invalid: NaN };
  assert.throws(() => perception.classify([10], categories), TypeError, 'Threshold for invalid must be a finite number.');
});

// Additional edge case tests for classify method

test('classify handles threshold equal to input', () => {
  const inputs = [10, 20, 30];
  const categories = { equal: 20 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { equal: [20, 30] });
});

test('classify handles negative thresholds', () => {
  const inputs = [10, -5, 15];
  const categories = { negative: -10 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { negative: [10, -5, 15] });
});

test('classify handles all inputs below threshold', () => {
  const inputs = [1, 2, 3];
  const categories = { high: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { high: [] });
});
