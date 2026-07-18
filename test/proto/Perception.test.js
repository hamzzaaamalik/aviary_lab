import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('handleMultipleInputs should categorize valid inputs', () => {
  const perception = new Perception();
  const inputs = [{ sight: true }, { sound: true }, { smell: true }];
  const results = perception.handleMultipleInputs(inputs);
  assert.deepEqual(results, ['visual', 'auditory', 'olfactory']);
});

test('handleMultipleInputs should log invalid inputs', () => {
  const perception = new Perception();
  const inputs = [{ sight: true }, null, { sound: true }];
  const results = perception.handleMultipleInputs(inputs);
  assert.deepEqual(results, ['visual', 'invalid', 'auditory']);
});

test('handleMultipleInputs should throw TypeError if inputs are not an array', () => {
  const perception = new Perception();
  assert.throws(() => perception.handleMultipleInputs('not an array'), TypeError);
});

