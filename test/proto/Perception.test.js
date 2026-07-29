import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 1, medium: 3, high: 5 };
  const categorized = perception.classify(inputs, thresholds);
  assert.deepEqual(categorized, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5],
  });
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'not a number' }), TypeError);
});

test('classify returns empty for no inputs', () => {
  const categorized = perception.classify([], { low: 1 });
  assert.deepEqual(categorized, {});
});

