import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with valid thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify returns empty object for empty inputs', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('classify throws TypeError for invalid thresholds object', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws TypeError for invalid threshold types', () => {
  assert.throws(() => perception.classify([1, 2], { low: 'a' }), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: Infinity }), TypeError);
});

test('classify throws TypeError for empty thresholds', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws TypeError for missing thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: 1, high: null }), TypeError);
});

