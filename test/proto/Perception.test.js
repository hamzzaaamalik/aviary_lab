import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sight', data: 'light' },
    { type: 'sound', data: 'noise' },
    { type: 'sight', data: 'movement' }
  ];
  const result = perception.processSensoryInputs(inputs);
  assert.deepEqual(result, {
    sight: [
      { type: 'sight', data: 'light' },
      { type: 'sight', data: 'movement' }
    ],
    sound: [
      { type: 'sound', data: 'noise' }
    ]
  });
});

test('filterSensoryInputs returns only specified category', () => {
  const inputs = [
    { type: 'sight', data: 'light' },
    { type: 'sound', data: 'noise' }
  ];
  const result = perception.filterSensoryInputs(inputs, 'sight');
  assert.deepEqual(result, [{ type: 'sight', data: 'light' }]);
});

test('processSensoryInputs throws for invalid inputs', () => {
  assert.throws(() => perception.processSensoryInputs(null), TypeError);
  assert.throws(() => perception.processSensoryInputs([]), TypeError);
  assert.throws(() => perception.processSensoryInputs([{ type: 'sight' }]), TypeError);
  assert.throws(() => perception.processSensoryInputs([{ type: '', data: 'light' }]), TypeError);
  assert.throws(() => perception.processSensoryInputs([{ type: 'sight', data: undefined }]), TypeError);
});

test('filterSensoryInputs throws for invalid category', () => {
  const inputs = [{ type: 'sight', data: 'light' }];
  assert.throws(() => perception.filterSensoryInputs(inputs, ''), TypeError);
});
