import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds and merges categories', () => {
  const inputs = [3, 5, 7, 9, 11];
  const thresholds = { low: 5, medium: 9, high: 3 };
  const classified = perception.classify(inputs, thresholds);
  assert.deepEqual(classified, {
    '5': [5, 7, 9, 11],
    '3': [3, 5, 7, 9, 11],
    '9': [9, 11],
  });
});

test('classify throws on non-finite input', () => {
  assert.throws(() => perception.classify([1, 2, NaN], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2, Infinity], { low: 1 }), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: Infinity }), TypeError);
  assert.throws(() => perception.classify([1, 2], { low: NaN }), TypeError);
});

// Other existing tests...
