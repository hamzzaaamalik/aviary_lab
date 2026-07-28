import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const expected = {
    15: [20, 30, 40],
    25: [30, 40],
    35: [40]
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
});

test('classify handles empty inputs', () => {
  const result = perception.classify([], { low: 15 });
  assert.deepEqual(result, {});
});

test('classify throws on non-numeric inputs', () => {
  assert.throws(() => perception.classify([10, 'a', 30], { low: 15 }), TypeError);
});

