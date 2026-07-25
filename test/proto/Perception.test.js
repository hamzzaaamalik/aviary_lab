import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws TypeError for non-finite thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { valid: 1, invalid: NaN };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify throws TypeError for empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = {};
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify works correctly with valid inputs', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { low: 2, high: 3 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify throws TypeError for null categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
});