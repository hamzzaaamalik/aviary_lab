import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'boop' }
  ];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sound: [
      { type: 'sound', data: 'beep' },
      { type: 'sound', data: 'boop' }
    ],
    sight: [
      { type: 'sight', data: 'image' }
    ]
  });
});

test('filterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'boop' }
  ];
  const filtered = perception.filterSensoryInputs(inputs, 'sound');
  assert.deepEqual(filtered, [
    { type: 'sound', data: 'beep' },
    { type: 'sound', data: 'boop' }
  ]);
});

test('advancedFilterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'boop' }
  ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['sound']);
  assert.deepEqual(filtered, [
    { type: 'sound', data: 'beep' },
    { type: 'sound', data: 'boop' }
  ]);
});

test('filterSensoryInputs throws TypeError for invalid category', () => {
  assert.throws(() => perception.filterSensoryInputs([], ''), TypeError);
});

test('advancedFilterSensoryInputs throws TypeError for invalid categories', () => {
  assert.throws(() => perception.advancedFilterSensoryInputs([], []), TypeError);
});
