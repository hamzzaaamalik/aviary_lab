import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns categorized inputs', () => {
  const sensoryInputs = [10, 20, 30, 40, 50];
  const thresholdsMap = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(sensoryInputs, thresholdsMap);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50]
  });
});

test('classify throws for invalid sensoryInputs', () => {
  const thresholdsMap = { low: 15 };
  assert.throws(() => perception.classify(null, thresholdsMap), TypeError);
  assert.throws(() => perception.classify({}, thresholdsMap), TypeError);
});

test('classify throws for invalid thresholdsMap', () => {
  const sensoryInputs = [10, 20];
  assert.throws(() => perception.classify(sensoryInputs, null), TypeError);
  assert.throws(() => perception.classify(sensoryInputs, {}), TypeError);
  assert.throws(() => perception.classify(sensoryInputs, { low: NaN }), TypeError);
});

test('classify handles empty sensoryInputs', () => {
  const thresholdsMap = { low: 15 };
  const result = perception.classify([], thresholdsMap);
  assert.deepEqual(result, {});
});

