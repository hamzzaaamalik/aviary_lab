import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound of rain', 'sight of the sunset', 'touch of a feather'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    audio: ['sound of rain'],
    visual: ['sight of the sunset'],
    tactile: ['touch of a feather'],
  });
});

test('categorizeSensoryInputs throws on unknown category', () => {
  const inputs = ['something else'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    unknown: ['something else'],
  });
});

// Add more tests as needed for edge cases or additional scenarios
