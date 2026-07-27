import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize returns empty array for empty input', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize handles single value input', () => {
  const result = perception.normalize([42]);
  assert.deepEqual(result, [0]);
});

test('normalize scales multiple inputs correctly', () => {
  const result = perception.normalize([10, 20, 30]);
  assert.deepEqual(result, [0, 0.5, 1]);
});

test('normalize handles identical inputs', () => {
  const result = perception.normalize([5, 5, 5]);
  assert.deepEqual(result, [0, 0, 0]);
});

// Existing tests for detect and filter methods...

