import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 20, high: 40 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    high: [40, 50],
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 20 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([10], null), TypeError);
  assert.throws(() => perception.classify([10], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([10], { low: 'invalid' }), TypeError);
  assert.throws(() => perception.classify([10], { low: NaN }), TypeError);
});

