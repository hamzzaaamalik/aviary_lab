import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on non-finite threshold', () => {
  assert.throws(() => perception.classify([1, 2, 3], { valid: NaN }), TypeError);
});

test('classify returns classified inputs', () => {
  const categories = { high: 2, low: 1 };
  const result = perception.classify([1, 2, 3], categories);
  assert.deepEqual(result, { high: [2, 3], low: [1, 2, 3] });
});

// Add more existing tests for other methods as necessary
