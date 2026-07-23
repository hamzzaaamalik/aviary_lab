import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detectNoise detects values above the threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detectNoise(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detectNoise throws error on invalid input type', () => {
  assert.throws(() => perception.detectNoise('not an array', 2), TypeError);
});

test('detectNoise throws error on non-number threshold', () => {
  assert.throws(() => perception.detectNoise([1, 2, 3], 'not a number'), TypeError);
});

test('detectNoise handles empty input', () => {
  const result = perception.detectNoise([], 0);
  assert.deepEqual(result, []);
});
