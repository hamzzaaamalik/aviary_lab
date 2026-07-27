import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect() detects inputs above threshold', () => {
  const result = perception.detect([1, 2, 3, 4], 2);
  assert.deepEqual(result, [3, 4]);
});

test('detect() returns empty array when no inputs above threshold', () => {
  const result = perception.detect([1, 1], 2);
  assert.deepEqual(result, []);
});

test('filter() filters inputs correctly', () => {
  const result = perception.filter([1, 2, 3, 4], (x) => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter() returns empty array when no matches', () => {
  const result = perception.filter([1, 3, 5], (x) => x % 2 === 0);
  assert.deepEqual(result, []);
});

test('classify() classifies inputs based on thresholds', () => {
  const thresholds = { low: 1, high: 3 };
  const result = perception.classify([1, 2, 3, 4], thresholds);
  assert.deepEqual(result, { low: [1, 2, 3, 4], high: [3, 4] });
});

test('classify() throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
});

test('normalize() normalizes inputs to range 0-1', () => {
  const result = perception.normalize([1, 2, 3, 4]);
  assert.deepEqual(result, [0, 0.3333333333333333, 0.6666666666666666, 1]);
});

test('normalize() handles empty array case', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize() handles single value case', () => {
  const result = perception.normalize([5]);
  assert.deepEqual(result, [0]);
});

