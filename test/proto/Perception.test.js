import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize transforms inputs to range [0, 1]', () => {
  const inputs = [10, 20, 30, 40, 50];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize handles edge case where all values are the same', () => {
  const inputs = [5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

test('normalize throws on invalid inputs', () => {
  assert.throws(() => perception.normalize([1, 2, NaN]), TypeError);
  assert.throws(() => perception.normalize('not an array'), TypeError);
});

// Existing tests for detect and filter...

