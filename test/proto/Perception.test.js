import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly classifies inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { noise: 3, signal: 2 };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, {
    noise: [3, 4, 5],
    signal: [2, 3, 4, 5]
  });
});

test('classify throws on empty inputs', () => {
  const categories = { noise: 3 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { noise: 'notANumber' }), TypeError);
});

test('classify handles non-finite thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { noise: Infinity }), TypeError);
});
