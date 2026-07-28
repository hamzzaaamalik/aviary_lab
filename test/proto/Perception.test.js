import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Test classify method

test('classify groups inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50],
  });
});

// Edge case tests for classify method

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([10], null), TypeError);
  assert.throws(() => perception.classify([10], {}), TypeError);
  assert.throws(() => perception.classify([10], { low: 'invalid' }), TypeError);
});

test('classify handles empty inputs gracefully', () => {
  const result = perception.classify([], { low: 0 });
  assert.deepEqual(result, {});
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify(null, { low: 0 }), TypeError);
  assert.throws(() => perception.classify(undefined, { low: 0 }), TypeError);
  assert.throws(() => perception.classify([null], { low: 0 }), TypeError);
  assert.throws(() => perception.classify([undefined], { low: 0 }), TypeError);
});
