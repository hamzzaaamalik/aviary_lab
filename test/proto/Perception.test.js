import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    'the sound of music',
    'a bright light',
    'I can feel the heat',
    'a random thought'
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    auditory: ['the sound of music'],
    visual: ['a bright light'],
    tactile: ['I can feel the heat'],
    other: ['a random thought']
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs([123, true]), TypeError);
});

