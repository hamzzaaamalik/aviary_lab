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
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'two' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: Infinity }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
});

test('classify returns empty object on no inputs', () => {
  const thresholds = { low: 2 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify throws on invalid inputs', () => {
  const thresholds = { low: 2 };
  assert.throws(() => perception.classify(null, thresholds), TypeError);
});

// Edge case tests
test('classify throws on non-numeric inputs', () => {
  const thresholds = { low: 2 };
  assert.throws(() => perception.classify(['a', 'b', 3], thresholds), TypeError);
  assert.throws(() => perception.classify([1, 2, null], thresholds), TypeError);
  assert.throws(() => perception.classify([1, 2, undefined], thresholds), TypeError);
});

test('classify handles thresholds with non-numeric values', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { low: 'not-a-number' }), TypeError);
  assert.throws(() => perception.classify(inputs, { high: null }), TypeError);
  assert.throws(() => perception.classify(inputs, { medium: undefined }), TypeError);
});
