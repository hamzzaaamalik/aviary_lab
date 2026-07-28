import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs into categories based on thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, medium: 25, high: 35 };
  const expected = {
    '15': [20, 30, 40],
    '25': [30, 40],
    '35': [40]
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify handles empty input array', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
  assert.throws(() => perception.classify([1, 2], { a: NaN }), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([1, 'a'], { low: 1 }), TypeError);
});

test('classify merges categories with the same threshold', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 20, high: 40 };
  const expected = {
    '20': [20, 30, 40],
    '40': [40]
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});
