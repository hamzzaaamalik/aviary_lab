import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize with empty inputs returns empty object', () => {
  const result = perception.categorize([], { high: 10, low: 5 });
  assert.deepEqual(result, {});
});

test('categorize with no thresholds returns empty object', () => {
  const result = perception.categorize([1, 2, 3], {});
  assert.deepEqual(result, {});
});

test('categorize includes empty categories when specified', () => {
  const result = perception.categorize([1, 2, 3], { high: 1, low: 5 }, true);
  assert.deepEqual(result, { high: [1, 2, 3], low: [] });
});

test('categorize excludes empty categories by default', () => {
  const result = perception.categorize([1, 2, 3], { high: 1, low: 5 });
  assert.deepEqual(result, { high: [1, 2, 3] });
});

// existing tests would go here
