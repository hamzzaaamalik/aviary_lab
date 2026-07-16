import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    'sound of rain',
    'sight of stars',
    'touch of fabric',
    'smell of coffee',
    'taste of honey',
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    auditory: ['sound of rain'],
    visual: ['sight of stars'],
    tactile: ['touch of fabric'],
    olfactory: ['smell of coffee'],
    gustatory: ['taste of honey'],
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid input', 123]), TypeError);
});

