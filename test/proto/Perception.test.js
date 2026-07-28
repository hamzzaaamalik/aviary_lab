import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 0, medium: 3, high: 5 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5],
  });
});

test('classify handles empty inputs', () => {
  const result = perception.classify([], { low: 0 });
  assert.deepEqual(result, {});
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: NaN }), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([1, 2, 'three'], { low: 0 }), TypeError);
  assert.throws(() => perception.classify([1, 2, null], { low: 0 }), TypeError);
});

test('classify returns empty object for no valid categories', () => {
  const inputs = [1, 2, 3];
  const thresholds = { low: 5 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [] });
});
