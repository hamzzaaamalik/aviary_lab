// test/proto/Perception.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('normalize returns an array of normalized inputs', () => {
  const inputs = [10, 20, 30];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.5, 1]);
});

test('normalize handles empty array', () => {
  const normalized = perception.normalize([]);
  assert.deepEqual(normalized, []);
});

test('normalize throws TypeError on invalid input', () => {
  assert.throws(() => perception.normalize([1, 'a', 3]), TypeError);
});

test('normalize handles identical inputs', () => {
  const inputs = [5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

