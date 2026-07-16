import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['text input', 'audio:clip1', 'video:clip1', 'audio:clip2', 'invalid input'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    text: ['text input', 'invalid input'],
    audio: ['audio:clip1', 'audio:clip2'],
    video: ['video:clip1'],
    other: []
  });
});

test('categorizeSensoryInputs throws for non-array inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws for non-string inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid input', 123]), TypeError);
});
