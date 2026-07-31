import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 5, 10, 15];
  const thresholds = { low: 5, medium: 10 };
  const expected = {
    low: [5, 10, 15],
    medium: [10, 15],
  };
  const actual = perception.classify(inputs, thresholds);
  assert.deepEqual(actual, expected);
});

test('classify throws on invalid thresholdsMap', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { high: 'not a number' }), TypeError);
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

