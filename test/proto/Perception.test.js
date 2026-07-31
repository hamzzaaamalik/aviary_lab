import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 20, medium: 30, high: 40 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50]
  });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  const thresholds = { low: 20, medium: Infinity };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

test('classify throws on invalid inputs', () => {
  const invalidInputs = [10, 'foo', null];
  const thresholds = { low: 5 };
  assert.throws(() => perception.classify(invalidInputs, thresholds), TypeError);
});

test('classify handles empty inputs', () => {
  const thresholds = { low: 5 };
  assert.throws(() => perception.classify([], thresholds), TypeError);
});

