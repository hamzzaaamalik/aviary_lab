import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1], 'not an object'), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1], {}), TypeError);
});

test('classify throws on invalid threshold', () => {
  assert.throws(() => perception.classify([1], { invalid: 'not a number' }), TypeError);
});
