import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const expected = {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50]
  };
  assert.deepEqual(perception.classify(inputs, thresholds), expected);
});

test('classify throws on invalid thresholds map', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on invalid inputs', () => {
  const thresholds = { low: 15 };
  assert.throws(() => perception.classify('not an array', thresholds), TypeError);
  assert.throws(() => perception.classify([1, 2, 3, null], thresholds), TypeError);
});

test('classify returns empty object on empty input array', () => {
  const thresholds = { low: 15 };
  assert.deepEqual(perception.classify([], thresholds), {});
});
