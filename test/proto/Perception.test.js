import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio:track1', 'image:photo1', 'text:hello', 'video:clip1'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    audio: ['audio:track1'],
    image: ['image:photo1'],
    text: ['text:hello'],
    video: ['video:clip1'],
  });
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws on unknown input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', null]), TypeError);
});
