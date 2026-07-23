import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify handles empty categories gracefully', () => {
  const inputs = [1, 2, 3];
  const categories = {};
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {});
});

test('classify throws error for undefined thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { low: undefined };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

// Additional edge case tests for classify

test('classify returns empty arrays for non-matching thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [], high: [] });
});

test('classify returns results based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 3, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [3, 4, 5], high: [4, 5] });
});
