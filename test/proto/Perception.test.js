import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const expected = {
    2: [2, 3, 4, 5],
    4: [4, 5]
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify handles empty input', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('classify throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: 'invalid' }), TypeError);
  assert.throws(() => perception.classify([1, 2], null), TypeError);
});

test('classify throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.classify([1, NaN], { low: 1 }), TypeError);
  assert.throws(() => perception.classify(['string'], { low: 1 }), TypeError);
});
