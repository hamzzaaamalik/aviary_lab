import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns classified inputs based on thresholds', () => {
  const inputs = [0, 1, 2, 3, 4, 5];
  const categories = { low: 1, high: 3 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], high: [3, 4, 5] });
});

test('classify handles empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError, 'Categories must be a non-null object.');
  assert.throws(() => perception.classify([1, 2], {}), TypeError, 'Categories cannot be an empty object.');
});

test('validateThresholds throws for invalid thresholds', () => {
  assert.throws(() => perception.validateThresholds({ valid: 1, invalid: NaN }), TypeError, "Threshold for category 'invalid' must be a finite number.");
});
