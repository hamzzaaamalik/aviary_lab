import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1], { low: 'a' }), TypeError);
  assert.throws(() => perception.classify([1], { low: null }), TypeError);
  assert.throws(() => perception.classify([1], {}), TypeError);
  assert.throws(() => perception.classify([1], { low: {} }), TypeError);
});

test('classify returns empty object for no matching thresholds', () => {
  const inputs = [1, 2, 3];
  const thresholds = { high: 10 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { high: [] });
});
