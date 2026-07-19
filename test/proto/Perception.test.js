import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'olfactory', data: 'smell1' },
    { type: 'gustatory', data: 'taste1' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual' },
    { input: inputs[1], category: 'auditory' },
    { input: inputs[2], category: 'olfactory' },
    { input: inputs[3], category: 'gustatory' }
  ]);
});

test('categorizeSensoryInputs throws on unknown input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs([{ type: 'unknown', data: 'data' }]), TypeError);
});

test('process enhances sensory inputs', () => {
  const inputs = [{ type: 'visual', data: 'image1' }];
  const result = perception.process(inputs);
  assert.equal(result[0].context, 'seen');
});

test('batchProcess processes and enhances inputs', () => {
  const inputs = [{ type: 'auditory', data: 'sound1' }];
  const result = perception.batchProcess(inputs);
  assert.equal(result[0].context, 'heard');
});
