import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { high: 10 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws on invalid categories object', () => {
  assert.throws(() => perception.classify([10, 20], null), TypeError, 'Categories must be a non-empty object.');
  assert.throws(() => perception.classify([10, 20], {}), TypeError, 'Categories must be a non-empty object.');
});

test('classify throws on non-finite threshold', () => {
  assert.throws(() => perception.classify([10, 20], { high: Infinity }), TypeError, "Threshold for 'high' must be a finite number.");
  assert.throws(() => perception.classify([10, 20], { high: NaN }), TypeError, "Threshold for 'high' must be a finite number.");
});
