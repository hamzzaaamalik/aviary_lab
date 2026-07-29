import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [1, 5, 10, 15, 20];
  const thresholds = { low: 5, high: 15 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    low: [5, 10, 15, 20],
    high: [15, 20]
  });
});

test('classify throws TypeError for invalid thresholdsMap', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not-an-object'), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws TypeError for invalid sensoryInputs', () => {
  assert.throws(() => perception.classify('not-an-array', { low: 1 }), TypeError);
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws TypeError for empty sensoryInputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws TypeError for non-finite thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: NaN }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { high: Infinity }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { medium: 'not-a-number' }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { empty: null }), TypeError);
});

test('classify throws TypeError for empty thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

