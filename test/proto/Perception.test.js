import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles valid inputs and thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 3, high: 5 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [3, 4, 5], high: [5] });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'not-a-number' }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify throws on invalid inputs', () => {
  const thresholds = { low: 2 };
  assert.throws(() => perception.classify(null, thresholds), TypeError);
  assert.throws(() => perception.classify([1, 2, 'three'], thresholds), TypeError);
});

// Existing tests...
