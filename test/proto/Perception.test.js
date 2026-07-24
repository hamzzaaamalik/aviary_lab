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

// Add other existing tests for detect, filter, classify methods...
