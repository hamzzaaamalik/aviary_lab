import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual' },
    { input: inputs[1], category: 'auditory' }
  ]);
});

test('process enhances sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' }
  ];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual', context: 'context for visual' }
  ]);
});

test('batchProcess processes and enhances inputs', () => {
  const inputs = [
    { type: 'auditory', data: 'sound1' },
    { type: 'visual', data: 'image2' }
  ];
  const result = perception.batchProcess(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'auditory', context: 'context for auditory' },
    { input: inputs[1], category: 'visual', context: 'context for visual' }
  ]);
});
