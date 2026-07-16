import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', async () => {
  const inputs = ['audio:music', 'video:movie', 'text:note', 'audio:podcast'];
  const expected = {
    audio: ['audio:music', 'audio:podcast'],
    video: ['video:movie'],
    text: ['text:note'],
    unknown: [],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input types', async () => {
  assert.throws(() => perception.categorizeSensoryInputs(['audio:music', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', async () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('determineInputType returns correct type for audio', () => {
  assert.equal(perception.determineInputType('audio:music'), 'audio');
});

test('determineInputType returns correct type for video', () => {
  assert.equal(perception.determineInputType('video:movie'), 'video');
});

test('determineInputType returns correct type for text', () => {
  assert.equal(perception.determineInputType('text:note'), 'text');
});

test('determineInputType returns unknown for unrecognized types', () => {
  assert.equal(perception.determineInputType('image:photo'), 'unknown');
});
