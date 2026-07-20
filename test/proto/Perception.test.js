import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processSensoryInputs categorizes inputs', () => {
  const inputs = [ { type: 'sight', data: 'image1' }, { type: 'sound', data: 'audio1' }, { type: 'sight', data: 'image2' } ];
  const categorized = perception.processSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sight: [ { type: 'sight', data: 'image1' }, { type: 'sight', data: 'image2' } ],
    sound: [ { type: 'sound', data: 'audio1' } ]
  });
});

test('filterSensoryInputs throws for invalid category', () => {
  const inputs = [ { type: 'sight', data: 'image1' } ];
  assert.throws(() => perception.filterSensoryInputs(inputs, ''), TypeError);
});

test('advancedFilterSensoryInputs filters by multiple categories', () => {
  const inputs = [ { type: 'sight', data: 'image1' }, { type: 'sound', data: 'audio1' }, { type: 'sight', data: 'image2' } ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['sight']);
  assert.deepEqual(filtered, [ { type: 'sight', data: 'image1' }, { type: 'sight', data: 'image2' } ]);
});

test('getSensoryInputsOfType throws for invalid type', () => {
  const inputs = [ { type: 'sight', data: 'image1' } ];
  assert.throws(() => perception.getSensoryInputsOfType(inputs, ''), TypeError);
});

test('validateSensoryInputs throws for empty array', () => {
  assert.throws(() => perception.validateSensoryInputs([]), TypeError);
});

test('validateSensoryInputs throws for invalid input structure', () => {
  const inputs = [ { type: 'sight', data: 'image1' }, null ];
  assert.throws(() => perception.validateSensoryInputs(inputs), TypeError);
});
