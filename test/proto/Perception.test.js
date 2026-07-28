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
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'a' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
});

test('classify works with empty input', () => {
  const thresholds = { low: 1 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify(null, { low: 1 }), TypeError);
  assert.throws(() => perception.classify(undefined, { low: 1 }), TypeError);
  assert.throws(() => perception.classify({}, { low: 1 }), TypeError);
});
