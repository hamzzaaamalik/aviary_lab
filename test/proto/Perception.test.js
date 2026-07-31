import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters valid inputs', () => {
  const result = perception.detect([1, 2, null, undefined, 3]);
  assert.deepEqual(result, [1, 2, 3]);
});

test('detect returns empty array for empty input', () => {
  const result = perception.detect([]);
  assert.deepEqual(result, []);
});

test('filter applies predicate correctly', () => {
  const result = perception.filter([1, 2, 3, 4], n => n > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filter returns empty array for empty input', () => {
  const result = perception.filter([], n => n > 2);
  assert.deepEqual(result, []);
});

test('classify returns categorized inputs', () => {
  const result = perception.classify([1, 2, 3, 4], { low: 2, high: 3 });
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify throws error for empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws error for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: null }), TypeError);
});

test('validateThresholds returns true for valid thresholds', () => {
  const valid = { low: 1, high: 2 };
  assert.ok(perception.validateThresholds(valid));
});

test('validateThresholds returns false for invalid thresholds', () => {
  const invalid = { low: NaN };
  assert.ok(!perception.validateThresholds(invalid));
});
