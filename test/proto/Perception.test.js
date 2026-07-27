import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize handles NaN and Infinity', () => {
  assert.throws(() => perception.normalize([1, 2, NaN]), TypeError);
  assert.throws(() => perception.normalize([1, 2, Infinity]), TypeError);
  assert.throws(() => perception.normalize([1, 2, -Infinity]), TypeError);
});

test('normalize returns empty array for empty input', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize returns correct values', () => {
  const result = perception.normalize([0, 10, 20]);
  assert.deepEqual(result, [0, 0.5, 1]);
});

test('normalize handles all equal inputs', () => {
  const result = perception.normalize([5, 5, 5]);
  assert.deepEqual(result, [0, 0, 0]);
});

// Additional tests for existing methods can be added here.
