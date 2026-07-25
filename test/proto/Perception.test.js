import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const expected = {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, expected);
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 10 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([10], 'not an object'), TypeError);
  assert.throws(() => perception.classify([10], {}), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  assert.throws(() => perception.classify([10], { low: NaN }), TypeError);
  assert.throws(() => perception.classify([10], { low: Infinity }), TypeError);
});

