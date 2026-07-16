import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs classifies inputs correctly', () => {
  const inputs = ['visual: sunset', 'auditory: thunder', 'visual: sunrise', 'other: event'];
  const expected = {
    visual: ['visual: sunset', 'visual: sunrise'],
    auditory: ['auditory: thunder'],
    other: ['other: event'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

