import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sound', value: 'beep' },
    { type: 'sight', value: 'red' },
    { type: 'sound', value: 'buzz' },
  ];
  const result = perception.processSensoryInputs(inputs);
  assert.deepEqual(result, {
    sound: [
      { type: 'sound', value: 'beep' },
      { type: 'sound', value: 'buzz' },
    ],
    sight: [{ type: 'sight', value: 'red' }],
  });
});

test('processSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.processSensoryInputs(null), TypeError);
  assert.throws(() => perception.processSensoryInputs([{ value: 'missing type' }]), TypeError);
});

test('filterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sound', value: 'beep' },
    { type: 'sight', value: 'red' },
  ];
  const result = perception.filterSensoryInputs(inputs, 'sound');
  assert.deepEqual(result, [{ type: 'sound', value: 'beep' }]);
});

test('advancedFilterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sound', value: 'beep' },
    { type: 'sight', value: 'red' },
    { type: 'sound', value: 'buzz' },
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['sound']);
  assert.deepEqual(result, [
    { type: 'sound', value: 'beep' },
    { type: 'sound', value: 'buzz' },
  ]);
});

test('filterSensoryInputs throws on invalid category', () => {
  const inputs = [{ type: 'sound', value: 'beep' }];
  assert.throws(() => perception.filterSensoryInputs(inputs, ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs(inputs, null), TypeError);
});

test('advancedFilterSensoryInputs throws on invalid categories', () => {
  const inputs = [{ type: 'sound', value: 'beep' }];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, ''), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, null), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, [null]), TypeError);
});
