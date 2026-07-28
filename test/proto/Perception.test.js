import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 5, 10, 15];
  const thresholds = { low: 5, medium: 10 };
  const expected = { low: [5, 10, 15], medium: [10, 15] };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws for invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'a' }), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const thresholds = { low: 5 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify checks valid inputs', () => {
  const inputs = [1, null, undefined, NaN, 5];
  const thresholds = { valid: 0 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});
