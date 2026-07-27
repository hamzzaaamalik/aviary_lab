import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Test for normalize method

test('normalize should return normalized values between 0 and 1', () => {
  const inputs = [10, 20, 30, 40];
  const expected = [0, 0.3333, 0.6667, 1];
  const result = perception.normalize(inputs);
  assert.deepEqual(result.map(v => Math.round(v * 10000) / 10000), expected);
});


test('normalize should return an empty array for an empty input', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});


test('normalize should return an array of zeros if all inputs are the same', () => {
  const inputs = [5, 5, 5];
  const result = perception.normalize(inputs);
  assert.deepEqual(result, [0, 0, 0]);
});


test('normalize should throw TypeError for invalid input', () => {
  assert.throws(() => perception.normalize('invalid'), TypeError);
  assert.throws(() => perception.normalize([1, 2, 'invalid']), TypeError);
});


test('normalize should throw TypeError for non-array input', () => {
  assert.throws(() => perception.normalize({}), TypeError);
});
