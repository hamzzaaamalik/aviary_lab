import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns inputs above threshold', () => {
  const result = perception.detect([1, 2, 3, 4, 5], 3);
  assert.deepEqual(result, [4, 5]);
});

test('detect returns empty array when no inputs above threshold', () => {
  const result = perception.detect([1, 1, 1], 2);
  assert.deepEqual(result, []);
});

test('detect throws TypeError for invalid threshold', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'a'), TypeError);
});

test('filter returns inputs matching predicate', () => {
  const result = perception.filter([1, 2, 3, 4], x => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter returns empty array when no inputs match predicate', () => {
  const result = perception.filter([1, 3, 5], x => x % 2 === 0);
  assert.deepEqual(result, []);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not-a-function'), TypeError);
});

test('classify categorizes inputs correctly', () => {
  const thresholds = { low: 1, high: 3 };
  const result = perception.classify([1, 2, 3, 4], thresholds);
  assert.deepEqual(result, { low: [1, 2, 3, 4], high: [3, 4] });
});

test('classify throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not-an-object'), TypeError);
});

test('normalize outputs values between 0 and 1', () => {
  const result = perception.normalize([1, 2, 3, 4]);
  assert.deepEqual(result, [0, 0.3333333333333333, 0.6666666666666666, 1]);
});

test('normalize handles empty array', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.normalize([1, NaN, 3]), TypeError);
});
