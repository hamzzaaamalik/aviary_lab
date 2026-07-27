import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize() standardizes inputs to range [0, 1]', () => {
  const inputs = [10, 20, 30, 40];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.3333333333333333, 0.6666666666666666, 1]);
});

test('normalize() handles single value inputs', () => {
  const inputs = [50, 50, 50];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]); // all same values
});

test('normalize() throws on invalid inputs', () => {
  assert.throws(() => perception.normalize('not an array'), TypeError);
  assert.throws(() => perception.normalize([1, 2, 'not a number']), TypeError);
});

// Existing tests for detect, filter, and classify methods...
