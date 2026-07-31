import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { categoryA: 1 }), TypeError);
});

test('classify throws on invalid thresholds map', () => {
  assert.throws(() => perception.classify([1, 2, 3], { categoryA: 'invalid' }), TypeError);
});

test('classify returns categorized inputs based on thresholds', () => {
  const result = perception.classify([1, 2, 3, 4, 5], { categoryA: 3, categoryB: 1 });
  assert.deepEqual(result, { categoryA: [3, 4, 5], categoryB: [1, 2, 3, 4, 5] });
});

test('classify handles various threshold values correctly', () => {
  const result = perception.classify([0, 1, 2, 3], { low: 1, high: 2 });
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});
