import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on non-object categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], []), TypeError);
});

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { a: 1 }), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify correctly classifies inputs', () => {
  const categories = { low: 1, high: 2 };
  const result = perception.classify([1, 2, 3], categories);
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});

test('classify handles non-finite thresholds', () => {
  const categories = { low: Infinity };
  assert.throws(() => perception.classify([1, 2, 3], categories), TypeError);
});
