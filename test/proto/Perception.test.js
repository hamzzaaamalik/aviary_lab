import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize handles empty array', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize handles identical inputs', () => {
  const result = perception.normalize([5, 5, 5]);
  assert.deepEqual(result, [0, 0, 0]);
});

test('normalize scales input range to [0, 1]', () => {
  const result = perception.normalize([1, 2, 3, 4, 5]);
  assert.deepEqual(result, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize does not fail with negative inputs', () => {
  const result = perception.normalize([-3, -2, -1, 0, 1]);
  assert.deepEqual(result, [0, 0.25, 0.5, 0.75, 1]);
});

// Additional tests for detect and filter can be included here as needed.
