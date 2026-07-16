import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio: song.mp3', 'video: movie.mp4', 'text: message'];
  const expected = {
    audio: ['audio: song.mp3'],
    video: ['video: movie.mp4'],
    text: ['text: message'],
  };
  assert.deepEqual(perception.categorizeSensoryInputs(inputs), expected);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});
