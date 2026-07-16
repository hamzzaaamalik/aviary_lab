import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs classifies inputs correctly', () => {
  const inputs = ['sound:hello', 'sound:world', 'image:sunset', 'sound:music', 'text:info'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    audio: ['sound:hello', 'sound:world', 'sound:music'],
    other: ['image:sunset', 'text:info']
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws TypeError for non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});
