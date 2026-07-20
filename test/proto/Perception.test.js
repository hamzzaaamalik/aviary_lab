import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sight', data: 'something' },
    { type: 'sound', data: 'noise' },
    { type: 'sight', data: 'another thing' }
  ];
  const categorized = perception.processSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sight: [
      { type: 'sight', data: 'something' },
      { type: 'sight', data: 'another thing' }
    ],
    sound: [
      { type: 'sound', data: 'noise' }
    ]
  });
});

test('advancedFilterSensoryInputs filters inputs by multiple categories', () => {
  const inputs = [
    { type: 'sight', data: 'something' },
    { type: 'sound', data: 'noise' },
    { type: 'sight', data: 'another thing' }
  ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['sight']);
  assert.deepEqual(filtered, [
    { type: 'sight', data: 'something' },
    { type: 'sight', data: 'another thing' }
  ]);
});

test('advancedFilterSensoryInputs throws error for invalid categories', () => {
  const inputs = [{ type: 'sight', data: 'something' }];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, ''), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, []), TypeError);
});

