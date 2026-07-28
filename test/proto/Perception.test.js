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

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'string'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: 'low' }), TypeError);
});

test('classify returns empty object for empty input', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('classify handles edge case of no thresholds', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});
