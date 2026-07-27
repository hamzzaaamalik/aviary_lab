import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize returns an empty array for empty input', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize handles single value input', () => {
  const result = perception.normalize([5]);
  assert.deepEqual(result, [0]);
});

test('normalize scales input to range 0-1', () => {
  const result = perception.normalize([10, 20, 30]);
  assert.deepEqual(result, [0, 0.5, 1]);
});

test('normalize handles identical values correctly', () => {
  const result = perception.normalize([42, 42, 42]);
  assert.deepEqual(result, [0, 0, 0]);
});

test('normalize throws TypeError for invalid input', () => {
  assert.throws(() => perception.normalize('invalid'), TypeError);
  assert.throws(() => perception.normalize([1, 2, '3']), TypeError);
});
