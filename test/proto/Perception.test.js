import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize handles empty inputs gracefully', () => {
  const result = perception.categorize([], { noise: 0 });
  assert.deepEqual(result, {});
});

test('categorize includes empty categories when specified', () => {
  const result = perception.categorize([], { noise: 0 }, true);
  assert.deepEqual(result, { noise: [] });
});

test('categorize correctly classifies inputs based on categories', () => {
  const result = perception.categorize([1, 2, 3], { low: 1, high: 2 });
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});

test('categorize throws TypeError for invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2, 3], 'invalid'), TypeError);
});

test('categorize throws TypeError for non-number threshold', () => {
  assert.throws(() => perception.categorize([1, 2, 3], { low: 'invalid' }), TypeError);
});

// Add other existing tests for detect, filter, classify methods...
