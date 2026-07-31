import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateInputs throws on non-array input', () => {
  assert.throws(() => perception.validateInputs(null), TypeError);
  assert.throws(() => perception.validateInputs({}), TypeError);
  assert.throws(() => perception.validateInputs(123), TypeError);
});

test('validateInputs throws on empty array', () => {
  assert.throws(() => perception.validateInputs([]), TypeError);
});

test('validateInputs throws on non-finite numbers', () => {
  assert.throws(() => perception.validateInputs([1, 2, NaN]), TypeError);
  assert.throws(() => perception.validateInputs([1, 2, Infinity]), TypeError);
  assert.throws(() => perception.validateInputs([1, 2, -Infinity]), TypeError);
});

test('validateInputs accepts valid finite numbers', () => {
  perception.validateInputs([1, 2, 3]); // Should not throw
  perception.validateInputs([-1, 0, 1]); // Should not throw
});
