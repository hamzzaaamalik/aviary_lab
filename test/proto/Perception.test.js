import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize returns an array of normalized inputs', () => {
  const inputs = [10, 20, 30];
  const expected = [0, 0.5, 1];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, expected);
});

test('normalize handles empty array', () => {
  const inputs = [];
  const expected = [];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, expected);
});

test('normalize handles identical values', () => {
  const inputs = [5, 5, 5];
  const expected = [0, 0, 0];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, expected);
});

test('classify categorizes inputs correctly', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const expected = {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40],
  };
  const categorized = perception.classify(inputs, thresholds);
  assert.deepEqual(categorized, expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, 'not an object'), TypeError);
});