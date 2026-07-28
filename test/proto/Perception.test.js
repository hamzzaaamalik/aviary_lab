import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const classified = perception.classify(inputs, thresholds);
  assert.deepEqual(classified, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify handles empty input', () => {
  const classified = perception.classify([], { low: 1 });
  assert.deepEqual(classified, {});
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], { a: 'b' }), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([1, null], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, undefined], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, NaN], { low: 1 }), TypeError);
});
