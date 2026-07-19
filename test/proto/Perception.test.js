import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sensor', value: 42 },
    { type: 'action', value: 'move' },
  ];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, [
    { input: inputs[0], category: 'sensory' },
    { input: inputs[1], category: 'motor' },
  ]);
});

test('process enhances sensory inputs', () => {
  const inputs = [
    { type: 'sensor', value: 42 },
  ];
  const enhanced = perception.process(inputs);
  assert.deepEqual(enhanced, [
    { input: inputs[0], category: 'sensory', context: 'environmental context' },
  ]);
});

test('batchProcess processes and enhances inputs', () => {
  const inputs = [
    { type: 'sensor', value: 42 },
    { type: 'action', value: 'move' },
  ];
  const batchEnhanced = perception.batchProcess(inputs);
  assert.deepEqual(batchEnhanced, [
    { input: inputs[0], category: 'sensory', context: 'environmental context' },
    { input: inputs[1], category: 'motor', context: 'movement context' },
  ]);
});