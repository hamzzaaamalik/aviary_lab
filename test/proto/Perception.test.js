import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs', () => {
  const inputs = ['sound of a bell', 'sight of the stars', 'touch of a feather', 'sound of rain'];
  const expected = {
    auditory: ['sound of a bell', 'sound of rain'],
    visual: ['sight of the stars'],
    tactile: ['touch of a feather'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorize sensory inputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

