import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {
    2: [2, 3, 4, 5],
    4: [4, 5]
  });
});

test('classify with empty inputs', () => {
  const inputs = [];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, {});
});

test('classify with empty thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify with non-numeric inputs', () => {
  const inputs = [1, 2, 'three'];
  const thresholds = { low: 1 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

test('classify with non-finite threshold', () => {
  const inputs = [1, 2, 3];
  const thresholds = { low: NaN };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

