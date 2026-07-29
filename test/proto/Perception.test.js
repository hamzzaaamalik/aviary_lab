import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by threshold', () => {
  const inputs = [5, 10, 15, 20];
  const thresholds = { low: 10, high: 15 };
  const expected = {
    low: [10, 15, 20],
    high: [15, 20],
  };
  assert.deepEqual(perception.classify(inputs, thresholds), expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [5, 10, 15];
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 10, high: null }), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 10 };
  assert.deepEqual(perception.classify([], thresholds), {});
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify(null, { low: 10 }), TypeError);
  assert.throws(() => perception.classify(undefined, { low: 10 }), TypeError);
  assert.throws(() => perception.classify(['abc'], { low: 10 }), TypeError);
});
