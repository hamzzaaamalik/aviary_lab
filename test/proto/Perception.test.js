import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { categoryA: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], 'invalid'), TypeError);
});

test('classify throws on no valid classifications', () => {
  assert.throws(() => perception.classify([1, 2, 3], { categoryA: 4 }), TypeError);
});

test('classify returns correct classification', () => {
  const result = perception.classify([1, 2, 3, 4, 5], { categoryA: 3, categoryB: 1 });
  assert.deepEqual(result, {
    categoryA: [3, 4, 5],
    categoryB: [1, 2, 3, 4, 5],
  });
});
