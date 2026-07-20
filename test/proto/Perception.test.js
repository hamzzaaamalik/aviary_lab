import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const input = [{ type: 'visual' }, { type: 'auditory' }];
  const categorized = perception.categorizeSensoryInputs(input);
  assert.deepEqual(categorized, [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' }
  ]);
});

test('process enhances sensory inputs', () => {
  const input = [{ type: 'visual' }, { type: 'auditory' }];
  const enhanced = perception.process(input);
  assert.deepEqual(enhanced, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight based context' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound based context' }
  ]);
});

test('batchProcess processes and enhances inputs', () => {
  const input = [{ type: 'tactile' }, { type: 'visual' }];
  const enhanced = perception.batchProcess(input);
  assert.deepEqual(enhanced, [
    { input: { type: 'tactile' }, category: 'tactile', context: 'touch based context' },
    { input: { type: 'visual' }, category: 'visual', context: 'sight based context' }
  ]);
});
