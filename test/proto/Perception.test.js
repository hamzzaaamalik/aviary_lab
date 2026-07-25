import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles non-finite thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { valid: 1, invalid: NaN };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify handles empty sensory inputs', () => {
  const categories = { valid: 1 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify handles empty categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify works correctly with valid inputs', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 1, high: 2 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});
