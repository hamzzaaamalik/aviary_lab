import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify with empty inputs', () => {
  const inputs = [];
  const categories = { low: 2, high: 4 };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify with invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify with invalid inputs', () => {
  const inputs = [1, '2', 3];
  const categories = { low: 2 };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify with thresholds not being finite numbers', () => {
  const inputs = [1, 2, 3];
  const categories = { low: Infinity };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});
