import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
    { type: 'sight', data: 'image2' },
  ];
  const result = perception.processSensoryInputs(inputs);
  assert.deepEqual(result, {
    sight: [
      { type: 'sight', data: 'image1' },
      { type: 'sight', data: 'image2' },
    ],
    sound: [{ type: 'sound', data: 'sound1' }],
  });
});

test('categorizeSensoryInputs is an alias for processSensoryInputs', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, perception.processSensoryInputs(inputs));
});

test('filterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
  ];
  const result = perception.filterSensoryInputs(inputs, 'sight');
  assert.deepEqual(result, [{ type: 'sight', data: 'image1' }]);
});

test('advancedFilterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
    { type: 'touch', data: 'texture1' },
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['sight', 'sound']);
  assert.deepEqual(result, [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
  ]);
});

test('validateSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.validateSensoryInputs(null), TypeError);
  assert.throws(() => perception.validateSensoryInputs([]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: '', data: 'data' }]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: 'type', data: undefined }]), TypeError);
});
