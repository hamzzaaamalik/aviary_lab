import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const thresholds = { low: 5, high: 10 };
  const inputs = [3, 5, 7, 10, 12];
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [5, 7, 10, 12], high: [10, 12] });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [3, 5, 7];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'a' }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 5 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify handles non-numeric inputs gracefully', () => {
  const thresholds = { low: 5 };
  const inputs = [3, 5, 'string', null, undefined];
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

test('classify throws on empty thresholds', () => {
  const inputs = [5, 6];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});
