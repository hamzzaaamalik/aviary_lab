import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [
    'audio:sound1',
    'visual:image1',
    'tactile:feeling1',
    'random text',
    'audio:sound2'
  ];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    audio: ['audio:sound1', 'audio:sound2'],
    visual: ['visual:image1'],
    tactile: ['tactile:feeling1'],
    other: ['random text']
  });
});

test('categorizeSensoryInputs throws TypeError for invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid:string', 123]), TypeError);
});
