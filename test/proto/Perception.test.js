import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Test detect method

test('detect method detects inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detect(inputs, 3);
  assert.deepEqual(result, [4, 5]);
});

test('detect method throws TypeError for invalid threshold', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'invalid'), TypeError);
});

// Test filter method

test('filter method filters inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, (input) => input % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'invalid'), TypeError);
});

// Test classify method

test('classify method categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify method throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'invalid'), TypeError);
});

test('classify method throws TypeError for invalid threshold values', () => {
  const thresholds = { low: 'invalid' };
  assert.throws(() => perception.classify([1, 2, 3], thresholds), TypeError);
});
