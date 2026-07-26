import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by categories', () => {
  const inputs = [0.3, 0.5, 0.7, 1.2, 1.5];
  const categories = { low: 0.4, high: 1.0 };
  const expected = {
    low: [0.5, 0.7, 1.2, 1.5],
    high: [1.2, 1.5],
  };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, expected);
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 0.4 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([0.5], null), TypeError);
  assert.throws(() => perception.classify([0.5], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([0.5], { low: 'not-a-number' }), TypeError);
});
