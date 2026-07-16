import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs groups inputs by type', () => {
  const inputs = ['audio:track1', 'video:clip1', 'image:photo1', 'text:something'];
  const expected = {
    audio: ['audio:track1'],
    video: ['video:clip1'],
    image: ['image:photo1'],
    text: ['text:something'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

