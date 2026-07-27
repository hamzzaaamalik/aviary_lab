import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [10, 15, 20, 25];
  const thresholds = { low: 15, high: 20 };
  const expected = {
    low: [15, 20, 25],
    high: [20, 25],
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 15, 20, 25];
  assert.throws(() => perception.classify(inputs, 'invalid'), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
});

test('classify handles empty inputs', () => {
  const thresholds = { low: 15, high: 20 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify throws on non-finite inputs', () => {
  const inputs = [10, NaN, Infinity];
  const thresholds = { low: 5 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

