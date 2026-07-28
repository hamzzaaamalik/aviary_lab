import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [0, 10, 20, 30, 40];
  const thresholds = { low: 10, high: 30 };
  const expected = {
    10: [10, 20, 30, 40],
    30: [30, 40]
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'a' }), TypeError);
});

test('classify handles empty inputs', () => {
  const result = perception.classify([], { low: 10 });
  assert.deepEqual(result, {});
});

test('classify throws on non-finite inputs', () => {
  assert.throws(() => perception.classify([NaN], { low: 0 }), TypeError);
  assert.throws(() => perception.classify([1], { low: Infinity }), TypeError);
});
