import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify() returns categorized inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify() returns empty object for empty inputs', () => {
  const inputs = [];
  const thresholds = { low: 2 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {});
});

test('classify() throws TypeError for invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify() throws TypeError for invalid inputs', () => {
  const inputs = [1, 2, null];
  const thresholds = { low: 2 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});
