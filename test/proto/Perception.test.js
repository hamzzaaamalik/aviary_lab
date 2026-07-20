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

test('processSensoryInputs throws error for empty input', () => {
  assert.throws(() => perception.processSensoryInputs([]), TypeError);
});

test('processSensoryInputs throws error for invalid object structure', () => {
  const invalidInputs = [
    { type: 'sight' },
    null,
    { type: '', data: 'data' },
    { data: 'data' }
  ];
  invalidInputs.forEach((input, index) => {
    assert.throws(() => perception.processSensoryInputs([input]), TypeError,
      `Input at index ${index} must be a non-null object with a valid type and data properties.`);
  });
});
