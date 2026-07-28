import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('classify handles valid inputs correctly', () => {
  const perception = new Perception();
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { 2: [2, 3, 4, 5], 4: [4, 5] });
});

test('classify throws on invalid thresholds', () => {
  const perception = new Perception();
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: null }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify throws on invalid inputs', () => {
  const perception = new Perception();
  const invalidInputs = [1, 2, 'three'];
  const thresholds = { low: 2 };
  assert.throws(() => perception.classify(invalidInputs, thresholds), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const perception = new Perception();
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

