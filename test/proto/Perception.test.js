import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on non-numeric categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], { a: 'string' }), TypeError);
});

test('classify handles empty inputs', () => {
  const result = perception.classify([], { a: 1, b: 2 });
  assert.deepEqual(result, { a: [], b: [] });
});

test('detect returns empty array for empty inputs', () => {
  const result = perception.detect([], 1);
  assert.deepEqual(result, []);
});

test('filter returns empty array for empty inputs', () => {
  const result = perception.filter([], () => true);
  assert.deepEqual(result, []);
});

// Existing tests...

