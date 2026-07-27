import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize handles empty array', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize handles all zeros', () => {
  const result = perception.normalize([0, 0, 0]);
  assert.deepEqual(result, [0, 0, 0]);
});

test('normalize handles single value input', () => {
  const result = perception.normalize([42]);
  assert.deepEqual(result, [0]); // single value normalized to 0
});

test('normalize handles finite numbers', () => {
  const result = perception.normalize([1, 2, 3, 4, 5]);
  assert.deepEqual(result, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize throws on invalid input', () => {
  assert.throws(() => perception.normalize(['invalid']), TypeError);
  assert.throws(() => perception.normalize([NaN]), TypeError);
  assert.throws(() => perception.normalize([Infinity]), TypeError);
});

// Existing tests for detect, filter, and classify would also be here.
