import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on empty thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { category: NaN }), TypeError);
});

test('classify returns empty object for empty sensory inputs', () => {
  const result = perception.classify([], { category: 1 });
  assert.deepEqual(result, {});
});

test('classify returns correctly categorized inputs', () => {
  const thresholds = { low: 1, high: 2 };
  const inputs = [0, 1, 2, 3];
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});
