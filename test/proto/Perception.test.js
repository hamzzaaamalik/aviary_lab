import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('process integrates categorization and context enhancement', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'visual', detail: 'a beautiful sunset' },
    { type: 'auditory', detail: 'birds singing' },
  ];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual', context: 'context related to visual perception of a beautiful sunset' },
    { input: inputs[1], category: 'auditory', context: 'context related to auditory perception of birds singing' },
  ]);
});

// Additional tests for categorizeSensoryInputs and enhanceContext would go here.