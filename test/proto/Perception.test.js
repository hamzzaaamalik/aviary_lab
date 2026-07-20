import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [{ type: 'visual' }, { type: 'auditory' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' }
  ]);
});

test('process enhances sensory inputs', () => {
  const inputs = [{ type: 'visual' }, { type: 'auditory' }];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight context' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound context' }
  ]);
});

test('batchProcess processes and enhances inputs', () => {
  const inputs = [{ type: 'visual' }, { type: 'auditory' }];
  const result = perception.batchProcess(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight context' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound context' }
  ]);
});
