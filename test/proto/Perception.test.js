import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('classify groups sensory inputs by categories', () => {
  const perception = new Perception();
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const expected = {
    low: [2, 3, 4, 5],
    high: [4, 5]
  };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, expected);
});

test('classify throws on empty inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  const perception = new Perception();
  assert.throws(() => perception.classify([1, 2], null), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const perception = new Perception();
  assert.throws(() => perception.classify([1, 2], { invalid: 'string' }), TypeError);
});
