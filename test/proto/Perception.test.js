import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { a: 0 }), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], { a: 'not a number' }), TypeError);
});

test('classify works correctly with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 1,
    medium: 3,
    high: 5
  };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5]
  });
});

test('classify handles empty category object', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});
