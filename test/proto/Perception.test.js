import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests for detect and filter...

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

// Additional tests for classify method

test('classify throws on invalid sensoryInputs', () => {
  const thresholds = { low: 1 };
  assert.throws(() => perception.classify(null, thresholds), TypeError);
  assert.throws(() => perception.classify({}, thresholds), TypeError);
});


test('classify throws on invalid thresholdsMap', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});


test('classify returns empty object for empty inputs', () => {
  const thresholds = { low: 1 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});


test('classify throws on invalid threshold values', () => {
  const inputs = [1, 2, 3];
  const thresholds = { low: 'invalid' };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});
