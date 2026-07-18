import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('handleMultipleInputs returns categories for valid inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true }
  ];
  const result = perception.handleMultipleInputs(inputs);
  assert.deepEqual(result, ['visual', 'auditory']);
});

test('handleMultipleInputs returns error messages for invalid inputs', () => {
  const inputs = [
    { sight: true },
    null,
    { sound: true },
    undefined
  ];
  const result = perception.handleMultipleInputs(inputs);
  assert.deepEqual(result, ['visual', 'error: Input cannot be null or undefined', 'auditory', 'error: Input cannot be null or undefined']);
});

test('handleMultipleInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.handleMultipleInputs('not an array'), TypeError, 'Inputs must be an array');
});
