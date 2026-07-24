import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize throws on non-numeric category thresholds', () => {
  assert.throws(() => {
    perception.categorize([1, 2, 3], { categoryA: 'string' });
  }, TypeError, /Threshold for categoryA must be a number./);
});

test('categorize includes empty categories when specified', () => {
  const result = perception.categorize([1, 2, 3], { categoryA: 5 }, true);
  assert.deepEqual(result, { categoryA: [] });
});

test('categorize excludes empty categories', () => {
  const result = perception.categorize([1, 2, 3], { categoryA: 5 }, false);
  assert.deepEqual(result, {});
});

// Existing tests for detect, filter, and classify would be here.