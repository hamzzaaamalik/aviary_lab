import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty inputs', () => {
  assert.throws(() => perception.classify([], { category1: 1 }), TypeError);
});

test('classify handles extreme values', () => {
  const inputs = [1, 2, 3, 100, -1000];
  const categories = { low: 0, high: 50 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 100], high: [100] });
});

test('classify throws for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
});

test('classify throws for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { category1: 'notANumber' }), TypeError);
});

// Existing tests continue below
