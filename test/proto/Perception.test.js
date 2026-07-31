import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [10, 20, 30];
  const thresholds = { low: 15, high: 25 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [20, 30], high: [30] });
});

test('classify throws for invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, { low: 'low' }), TypeError);
  assert.throws(() => perception.classify(inputs, { high: NaN }), TypeError);
});

test('classify throws for invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', {}), TypeError);
  assert.throws(() => perception.classify([], {}), TypeError);
});

// Additional tests for edge cases

test('classify returns empty object for no valid categories', () => {
  const inputs = [1, 2, 3];
  const thresholds = { high: 100 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { high: [] });
});

