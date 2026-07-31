import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify throws on empty thresholdsMap', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on invalid threshold type', () => {
  assert.throws(() => perception.classify([1, 2, 3], { invalid: 'not-a-number' }), TypeError);
});

test('classify throws on empty sensoryInputs', () => {
  assert.throws(() => perception.classify([], { category: 1 }), TypeError);
});

test('classify throws on negative threshold', () => {
  assert.throws(() => perception.classify([1, 2, 3], { category: -1 }), RangeError);
});

// More tests as needed...