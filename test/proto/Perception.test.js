import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'boop' }
  ];
  const result = perception.processSensoryInputs(inputs);
  assert.deepEqual(result, {
    sound: [
      { type: 'sound', data: 'beep' },
      { type: 'sound', data: 'boop' }
    ],
    sight: [
      { type: 'sight', data: 'image' }
    ]
  });
});

test('filterSensoryInputs filters by category', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' }
  ];
  const result = perception.filterSensoryInputs(inputs, 'sound');
  assert.deepEqual(result, [
    { type: 'sound', data: 'beep' }
  ]);
});

test('advancedFilterSensoryInputs filters by multiple categories', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'boop' }
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['sound']);
  assert.deepEqual(result, [
    { type: 'sound', data: 'beep' },
    { type: 'sound', data: 'boop' }
  ]);
});

test('processSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.processSensoryInputs(null), TypeError);
  assert.throws(() => perception.processSensoryInputs([]), TypeError);
  assert.throws(() => perception.processSensoryInputs([{ type: 'sound' }]), TypeError);
});

test('filterSensoryInputs throws on invalid category', () => {
  assert.throws(() => perception.filterSensoryInputs([], ''), TypeError);
});

test('advancedFilterSensoryInputs throws on empty categories', () => {
  assert.throws(() => perception.advancedFilterSensoryInputs([], []), TypeError);
});
