import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize() normalizes inputs to range [0, 1]', () => {
  const inputs = [10, 20, 30, 40, 50];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize() handles edge case of identical inputs', () => {
  const inputs = [5, 5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0, 0]);
});

test('normalize() throws on invalid input', () => {
  assert.throws(() => perception.normalize([1, 2, '3']), TypeError);
  assert.throws(() => perception.normalize('not an array'), TypeError);
});

// Additional tests for detect(), filter(), and classify()

test('detect() returns detected inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const detected = perception.detect(inputs, 3);
  assert.deepEqual(detected, [4, 5]);
});

test('filter() returns filtered inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const filtered = perception.filter(inputs, input => input % 2 === 0);
  assert.deepEqual(filtered, [2, 4]);
});

test('classify() categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const categorized = perception.classify(inputs, thresholds);
  assert.deepEqual(categorized, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify() throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { low: 'not a number' }), TypeError);
});
