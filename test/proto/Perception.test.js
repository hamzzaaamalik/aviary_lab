import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detectRange detects inputs within the range', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detectRange(inputs, 2, 4);
  assert.deepEqual(result, [2, 3, 4]);
});

test('detectRange throws TypeError for non-finite min', () => {
  assert.throws(() => perception.detectRange([1, 2, 3], Infinity, 4), TypeError);
});

test('detectRange throws TypeError for non-finite max', () => {
  assert.throws(() => perception.detectRange([1, 2, 3], 1, NaN), TypeError);
});

test('detectRange throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detectRange([1, 2, 'a'], 1, 4), TypeError);
});

test('checkInputs throws TypeError for invalid input array', () => {
  assert.throws(() => perception.checkInputs([1, 2, 'a']), TypeError);
  assert.throws(() => perception.checkInputs('not an array'), TypeError);
});
