import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize scales inputs to range 0-1', () => {
  const inputs = [10, 20, 30];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.5, 1]);
});

test('normalize returns array of zeros for identical values', () => {
  const inputs = [5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

test('normalize returns empty array for empty input', () => {
  const inputs = [];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, []);
});

test('normalize throws TypeError on invalid input', () => {
  assert.throws(() => perception.normalize([1, 2, '3']), TypeError);
  assert.throws(() => perception.normalize([1, 2, NaN]), TypeError);
  assert.throws(() => perception.normalize([1, 2, undefined]), TypeError);
  assert.throws(() => perception.normalize([1, 2, null]), TypeError);
});

// Existing tests for detect and filter methods
