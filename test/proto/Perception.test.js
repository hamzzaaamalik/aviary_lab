import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with valid inputs', () => {
  const inputs = [5, 10, 15, 20];
  const categories = { low: 10, high: 15 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [10, 15, 20], high: [15, 20] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 10 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([5], null), TypeError);
  assert.throws(() => perception.classify([5], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [5, 10, 15];
  assert.throws(() => perception.classify(inputs, { valid: 'not-a-number' }), TypeError);
});
