import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories based on thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [20, 30, 40, 50], medium: [30, 40, 50], high: [40, 50] });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, 'not an object'), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'not a number' }), TypeError);
});

test('classify handles empty inputs', () => {
  const thresholds = { low: 15 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

// Existing tests for detect and filter...

