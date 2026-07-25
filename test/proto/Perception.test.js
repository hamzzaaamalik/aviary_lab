import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { a: 1 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError, 'Categories must be an object.');
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on non-number threshold', () => {
  assert.throws(() => perception.classify([1, 2, 3], { a: 'string' }), TypeError, 'Threshold for a must be a number.');
});

test('classify returns classified inputs', () => {
  const categories = { high: 2, low: 1 };
  const result = perception.classify([1, 2, 3], categories);
  assert.deepEqual(result, { high: [2, 3], low: [1, 2, 3] });
});
