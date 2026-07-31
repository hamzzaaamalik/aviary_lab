import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const expected = {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40],
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  const invalidThresholds = { low: 'invalid', medium: 15 };
  assert.throws(() => perception.classify(inputs, invalidThresholds), TypeError);
});

test('classify throws on empty inputs', () => {
  const thresholds = { low: 15 };
  assert.throws(() => perception.classify([], thresholds), TypeError);
});

test('classify throws when not called with an object for thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, null), TypeError);
});

