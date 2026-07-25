import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [0, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const expected = {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15]
  };
  assert.deepEqual(perception.classify(inputs, categories), expected);
});

test('classify throws for empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 5 }), TypeError);
});

test('classify throws for invalid categories type', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'string'), TypeError);
});

test('classify throws for empty categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws for non-finite thresholds', () => {
  const categories = { low: 5, invalid: NaN };
  assert.throws(() => perception.classify([1, 2, 3], categories), TypeError);
});

test('classify throws for invalid thresholds', () => {
  const categories = { low: 5, medium: Infinity };
  assert.throws(() => perception.classify([1, 2, 3], categories), TypeError);
});

