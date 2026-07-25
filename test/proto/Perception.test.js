import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { high: 1 }), TypeError);
});

test('classify throws on non-object categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], 'string'), TypeError);
});

test('classify throws on empty categories object', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { high: NaN }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { low: Infinity }), TypeError);
});

test('classify works correctly with valid inputs and thresholds', () => {
  const categories = { low: 1, high: 2 };
  const result = perception.classify([1, 2, 3, 4], categories);
  assert.deepEqual(result, { low: [1, 2, 3, 4], high: [2, 3, 4] });
});
