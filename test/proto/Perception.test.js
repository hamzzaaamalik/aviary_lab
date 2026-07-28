import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [20, 30, 40], medium: [30, 40] });
});

test('classify handles invalid thresholds', () => {
  assert.throws(() => perception.classify([10, 20], null), TypeError);
  assert.throws(() => perception.classify([10, 20], {}), TypeError);
  assert.throws(() => perception.classify([10, 20], { high: 'not-a-number' }), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 15 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});