import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: { inputs: [1, 2, 3, 4, 5], count: 5 },
    medium: { inputs: [3, 4, 5], count: 3 },
    high: { inputs: [5], count: 1 }
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1], 'invalid'), TypeError);
  assert.throws(() => perception.classify([1], {}), TypeError);
});

test('classify throws on invalid category threshold', () => {
  assert.throws(() => perception.classify([1], { invalid: 'not-a-number' }), TypeError);
});

