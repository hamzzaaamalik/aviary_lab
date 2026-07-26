import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [10, 20, 30, 40];
  const categories = {
    low: 15,
    medium: 25,
    high: 35
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { test: 0 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([10], null), TypeError);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([10], { test: NaN }), TypeError);
});

