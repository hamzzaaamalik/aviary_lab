import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('classify categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const categorized = perception.classify(inputs, thresholds);
  assert.deepEqual(categorized, {
    low: [2, 3, 4, 5],
    high: [4, 5],
  });
});

test('classify throws on invalid thresholds', () => {
  const perception = new Perception();
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { low: 'not a number' }), TypeError);
});

test('classify returns empty object for empty input', () => {
  const perception = new Perception();
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('classify throws on non-numeric inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.classify([1, 2, 'three', 4], { low: 2 }), TypeError);
  assert.throws(() => perception.classify([1, 2, null, 4], { low: 2 }), TypeError);
});

test('classify throws on empty thresholds', () => {
  const perception = new Perception();
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});
