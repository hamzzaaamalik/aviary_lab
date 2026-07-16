import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [
    'text input',
    'image.jpg',
    'audio.mp3',
    'another text',
    'graphic.png',
    'sound.wav'
  ];
  const expected = {
    text: ['text input', 'another text'],
    image: ['image.jpg', 'graphic.png'],
    audio: ['audio.mp3', 'sound.wav'],
    unknown: []
  };
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, expected);
});

test('categorizeSensoryInputs throws for invalid inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

