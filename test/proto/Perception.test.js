import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify method correctly classifies inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    medium: 4,
    high: 6
  };
  const expected = {
    low: [2, 3, 4, 5],
    medium: [4, 5],
    high: []
  };
  assert.deepEqual(perception.classify(inputs, categories), expected);
});

test('classify method throws TypeError for empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 0 }), TypeError);
});

test('classify method throws TypeError for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], 'not-an-object'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify method throws TypeError for non-finite threshold', () => {
  const categories = { low: Infinity };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});
