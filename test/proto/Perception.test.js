import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs handles valid inputs', () => {
  const inputs = [
    { type: 'sound', value: 'beep' },
    { type: 'sight', value: 'red' },
    { type: 'sound', value: 'boop' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    sound: [
      { type: 'sound', value: 'beep' },
      { type: 'sound', value: 'boop' }
    ],
    sight: [{ type: 'sight', value: 'red' }]
  });
});

test('filterSensoryInputs throws on invalid category', () => {
  const inputs = [{ type: 'sound', value: 'beep' }];
  assert.throws(() => perception.filterSensoryInputs(inputs, ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs(inputs, null), TypeError);
});

test('filterSensoryInputs returns filtered inputs', () => {
  const inputs = [
    { type: 'sound', value: 'beep' },
    { type: 'sight', value: 'red' }
  ];
  const result = perception.filterSensoryInputs(inputs, 'sound');
  assert.deepEqual(result, [{ type: 'sound', value: 'beep' }]);
});

test('advancedFilterSensoryInputs throws on empty categories', () => {
  const inputs = [{ type: 'sound', value: 'beep' }];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, []), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, ''), TypeError);
});

test('advancedFilterSensoryInputs filters multiple categories', () => {
  const inputs = [
    { type: 'sound', value: 'beep' },
    { type: 'sight', value: 'red' },
    { type: 'sound', value: 'boop' }
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['sound']);
  assert.deepEqual(result, [
    { type: 'sound', value: 'beep' },
    { type: 'sound', value: 'boop' }
  ]);
});

test('validateSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.validateSensoryInputs([]), TypeError);
});

test('validateSensoryInputs throws on invalid input format', () => {
  assert.throws(() => perception.validateSensoryInputs([null]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: 123 }]), TypeError);
});
