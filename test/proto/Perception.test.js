import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.validateSensoryInputs(null), TypeError);
  assert.throws(() => perception.validateSensoryInputs('not an array'), TypeError);
});

test('validateSensoryInputs throws TypeError for empty array', () => {
  assert.throws(() => perception.validateSensoryInputs([]), TypeError);
});

test('validateSensoryInputs throws TypeError for invalid input structure', () => {
  assert.throws(() => perception.validateSensoryInputs([{ type: 'valid' }, { invalid: true }]), TypeError);
});

test('processSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' },
    { type: 'sight', value: 'car' }
  ];
  const categorized = perception.processSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sight: [
      { type: 'sight', value: 'tree' },
      { type: 'sight', value: 'car' }
    ],
    sound: [{ type: 'sound', value: 'bird' }]
  });
});

