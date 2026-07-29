import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'not-an-object'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify handles empty input', () => {
  const result = perception.classify([], { low: 2 });
  assert.deepEqual(result, {});
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([1, null], { low: 2 }), TypeError);
});
