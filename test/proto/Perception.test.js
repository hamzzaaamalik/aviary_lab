import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('enhanceContext enriches categorized data with context', () => {
  const categorizedData = [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' }
  ];
  const enhancedData = perception.enhanceContext(categorizedData);
  assert.deepEqual(enhancedData, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound' }
  ]);
});

// Additional tests for categorizeSensoryInputs and process methods

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' }
  ]);
});

test('process enhances inputs correctly', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' }
  ];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound' }
  ]);
});
